const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique:true
    },
    DDCCFF: {
        type: String,
        unique: true,
        required: true,
        lowercase:true
    }
});

const Key = mongoose.model('key', KeySchema);

module.exports =Key;