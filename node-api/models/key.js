const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    endDate: {
        type: Date,
        required: false,
    },
    // user: {
    //     type: mongoose.SchemaTypes.String,
    //     ref: 'user'
    // },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: mongoose.SchemaTypes.String,
        ref: 'keyRequest'
    }
});

const key = mongoose.model('key', KeySchema);

module.exports = key;