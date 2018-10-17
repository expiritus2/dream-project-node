const TargetObject = require('../models/TargetObject');


const getRelatedObjectsByCoordinates = (coordinates, radius, userId) => {
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
};

exports.createTargetObject = (req, res, next) => {
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
            getRelatedObjectsByCoordinates(coordinates, 0.5, user._id)
                .then((response) => {
                    res.status(200).send({
                        message: "Target object was added successfully",
                        relatedObjects: response
                    });
                })
        });
};

exports.getRelatedObjectsByUser = (req, res, next) => {
    const {user} = req;
    let relatedObjects = [];

    TargetObject.find({_user: user._id}).then(ownObjects => {
        relatedObjects = [...ownObjects];
        relatedObjects.length && relatedObjects.forEach(object => {
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
                "location.coordinates": {$not: {$eq: coordinates}}
            }).then(relatedObjs => {
                relatedObjects = [
                    ...relatedObjects,
                    ...relatedObjs
                ];
                res.status(200).send({
                    message: "OK",
                    relatedObjects
                });
            })
        })
    }, err => {
        console.log(err)
    })


    // TargetObject.find({_user: user._id})
    //     .then(ownObjects => {
    //         relatedObjects = [...ownObjects];
    //         ownObjects && ownObjects.forEach(object => {
    //             const {coordinates} = object.location;
    //             getRelatedObjectsByCoordinates(coordinates, 0.5)
    //                 .then(relatedObjs => {
    //                     relatedObjects = [
    //                         ...relatedObjects,
    //                         ...relatedObjs
    //                     ]
    //                 })
    //         })
    //     }, err => {console.log(err)})
};