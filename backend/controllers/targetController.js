const TargetObject = require('../models/TargetObject');
const _ = require('lodash');


const targetController = {
    getRelatedObjectsByCoordinates(coordinates, radius, userId) {
        const latitude = parseFloat(coordinates.latitude);
        const longitude = parseFloat(coordinates.longitude);

        return TargetObject.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [longitude, latitude],
                        radius / 6378.1
                    ]
                }
            },
            _user: {$not: {$eq: userId}}

        });
    },

    createTargetObject(req, res, next) {
        const {body, files, user} = req;

        let fileNames = [];

        for (let i = 0; i < files.length; i++) {
            fileNames.push(files[i].filename)
        }

        const latitude = parseFloat(body.lat);
        const longitude = parseFloat(body.lng);
        const targetObject = new TargetObject({
            targetName: body.targetName,
            targetDescription: body.targetDescription,
            datetime: body.datetime,
            images: fileNames,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            _user: user
        });


        targetObject.save()
            .then(() => {
                const {body, user} = req;
                const coordinates = {
                    latitude: body.lat,
                    longitude: body.lng
                };
                targetController.getRelatedObjectsByCoordinates(coordinates, 0.5, user._id)
                    .then((response) => {
                        res.status(200).send({
                            message: "Target object was added successfully",
                            relatedObjects: response
                        });
                    }, err => console.log(err))
            }, err => console.log(err));
    },

    async getRelatedObjectsByUser(req, res, next) {
        const {user} = req;
        let relatedObjects = [];

        const ownObjects = await TargetObject.find({_user: user._id});
        relatedObjects = [...ownObjects];
        ownObjects && ownObjects.forEach((object, index) => {
            const {coordinates} = object.location;
            TargetObject.find({
                location: {
                    $geoWithin: {
                        $centerSphere: [
                            coordinates,
                            0.5 / 6378.1
                        ]
                    }
                },
                "location.coordinates": {$not: {$eq: coordinates}},
            }).then(result => {
                relatedObjects = [
                    ...relatedObjects,
                    ...result
                ];

                if (index === ownObjects.length - 1) {
                    res.status(200).send({
                        message: "OK",
                        relatedObjects
                    });
                }

            });
        });

        // relatedObjects[3].then(result => {console.log(result)});

        // TargetObject.find({_user: user._id}).then(ownObjects => {
        //     relatedObjects = [...ownObjects];
        //     ownObjects.length && ownObjects.forEach((object, index) => {
        //         const {coordinates} = object.location;
        //         TargetObject.find({
        //             location: {
        //                 $geoWithin: {
        //                     $centerSphere: [
        //                         coordinates,
        //                         0.5 / 6378.1
        //                     ]
        //                 }
        //             },
        //             "location.coordinates": {$not: {$eq: coordinates}}
        //         }).then(relatedObjs => {
        //             relatedObjects = [
        //                 ...relatedObjects,
        //                 ...relatedObjs
        //             ];
        //
        //             console.log(relatedObjs.length);
        //             if (index === ownObjects.length - 1) {
        //                 res.status(200).send({
        //                     message: "OK",
        //                     relatedObjects
        //                 });
        //             }
        //         }, err => {
        //             console.log(err)
        //         })
        //
        //     })
        // }, err => {
        //     console.log(err)
        // })
    }
};

module.exports = targetController;