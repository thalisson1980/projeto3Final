const mongoose = require('mongoose');

const list_DCFSchema = new mongoose.Schema({

    _id: {
        type: String,

    },
    codeDD: {
        type: String,
        required: true
    },
    location_DD: {
        type: String,
        required: true
    },
    codeCC: {
        type: String,
        required: true
    },
    location_CC: {
        type: String,
        required: true
    },
    codeFF: {
        type: String,
        required: true
    },
    location_FF: {
        type: String,
        required: true
    }

});

const list_DCF = mongoose.model('list_DCF', list_DCFSchema);

module.exports = list_DCF;