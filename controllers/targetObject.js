require('../models/TargetObject');
const mongoose = require('mongoose');
const TargetObject = mongoose.model('targetObject');

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
        _userId: user.id
    });

    targetObject.save();
    res.status(200).send({message: "Target object was added successfully"});
};