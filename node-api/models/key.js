const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    _id: {
        type: String
    },
    DDCCFF: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
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
        required: true,
        default: true,
    }

});

const Key = mongoose.model('key', KeySchema);

module.exports = Key;