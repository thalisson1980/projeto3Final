const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({

    _id: {
        type: String,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    DDCCFF: {
        type: mongoose.SchemaTypes.String,
        ref: 'DDCCFF'
    },
    startDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: false,
        default: null
    },
    user: {
        type: mongoose.SchemaTypes.String,
        ref: 'user'
    },
    ativo: {
        type: Boolean,
        required: false,
        default: true,
    }

});

const Key = mongoose.model('key', KeySchema);

module.exports = Key;