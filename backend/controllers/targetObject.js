const TargetObject = require('../models/TargetObject');


const getRelatedObjectsByCoordinates = (req, radius) => {
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
        }
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
            getRelatedObjectsByCoordinates(req, 0.5)
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
    TargetObject.aggregate([
        {$project: {_id: 1, targetName: 1, targetDescription: 1, location: 1, images: 1, datetime: 1, created: 1, _user: 1}}
    ], (err, result) => {
        console.log("res", result);
        res.status(200).send({message: "OK",});
    });
};