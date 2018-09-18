const mongoose = require('mongoose');
const {Schema} = mongoose;

const TargetSchema = new Schema({
    targetName: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Name of target is required"],
        validate: {
            validator: (targetName) => targetName.length > 3,
            message: 'Name of object must be longer than 3 characters'
        }
    },
    targetDescription: {
        type: String,
        required: [true, "Description is required"]
    },
    datetime: {
        type: Date,
        required: [true, "Datetime is required"]
    },
    images: {
        type: [String]
    },

    created: {
        type: Date,
        default: Date.now()
    },
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const TargetObject = mongoose.model('targetObject', TargetSchema);

module.exports = TargetObject;