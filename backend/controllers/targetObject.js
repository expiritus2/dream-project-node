const TargetObject = require('../models/TargetObject');

exports.createTargetObject = (req, res, next) => {
    const {body, files, user} = req;

    let fileNames = [];

    for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].filename)
    }
    const targetObject = new TargetObject({
        targetName: body.targetName,
        targetDescription: body.targetDescription,
        datetime: body.datetime,
        images: fileNames,
        lat: body.lat,
        lng: body.lng,
        _userId: user
    });

    targetObject.save();
    res.status(200).send({message: "Target object was added successfully"});
};

exports.getTargetObjects = (req, res, next) => {
    const {user} = req;
    res.send(user);
};