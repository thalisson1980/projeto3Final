const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    endDate: {
        type: Date,
        required: false,
        default:null
    },
     user: {
         type: mongoose.SchemaTypes.String,
        ref: 'user'
     },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    ativo: {
        type: Boolean,
        required: false,
        default: true,
    }
});

const key = mongoose.model('key', KeySchema);

module.exports = key;