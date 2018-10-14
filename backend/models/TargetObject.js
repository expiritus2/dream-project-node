const mongoose = require('mongoose');
const {Schema} = mongoose;

const TargetSchema = new Schema({
    targetName: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, "Name of target is required"],
        validate: {
            validator: (targetName) => targetName.length > 2,
            message: 'Name of object must be longer than 2 characters'
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

    location: {
        type: {
            type: String,
            default: 'Poing'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },

    created: {
        type: Date,
        default: Date.now()
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

TargetSchema.index({ location: "2dsphere" });

const TargetObject = mongoose.model('targetObject', TargetSchema);

module.exports = TargetObject;