const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
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

mongoose.model('users', userSchema);