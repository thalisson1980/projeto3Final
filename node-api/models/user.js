const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    createdAt:{
        type: Date,
        required: false,
        default: Date.now
    }, 
    key:{
        type: String,
        required: false,
        default: null
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;