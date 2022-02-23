const mongoose = require('mongoose');

const KeyRequestSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        lowercase: true
    },
    requestDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    requestReason: {
        type: String,
        lowercase: true
    },
    state: {
        type: String,
        lowercase: true,
        default: "pending"
    }
});

const KeyRequest = mongoose.model('keyRequest', KeyRequestSchema);

module.exports = KeyRequest;