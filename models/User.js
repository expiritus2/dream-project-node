const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    googleId: String,
    role: {
        type: String,
        default: 'user'
    },
    userInfo: {
        firstName: String,
        lastName: String,
        emails: Array
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;