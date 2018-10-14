const TargetObject = require('../models/TargetObject');


const getTargetObjects = (req, radius, selfId) => {
    const {body} = req;
    const latitude = parseFloat(body.lat);
    const longitude = parseFloat(body.lng);
    return TargetObject.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [longitude, latitude],
                    radius / 6378.1
                ]
            }
        },
        _id: {$not: {$eq: selfId}}
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
        .then((response) => {
            const selfId = response._id;
            getTargetObjects(req, 0.5, selfId)
                .then((response) => {
                    res.status(200).send({
                        message: "Target object was added successfully",
                        relatedObjects: response
                    });
                })
        });
};

exports.getTargetObjectsByRequest = (req, res, next) => {

};