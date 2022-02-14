const mongoose = require('mongoose');


const KeySchema = new mongoose.Schema({
<<<<<<< HEAD
    _id: {
        type: String
=======

    _id: {
        type: String,
>>>>>>> marcia
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
<<<<<<< HEAD
=======
        required: false,
>>>>>>> marcia
        default: true,
    }

});

const Key = mongoose.model('key', KeySchema);

module.exports = Key;