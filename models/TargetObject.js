const User = require('../models/User');

const mongoose = require('mongoose');
const {Schema} = mongoose;

const targetSchema = new Schema({
    targetName: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    targetDescription: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
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
        ref: User
    }
});

mongoose.model('targetObject', targetSchema);