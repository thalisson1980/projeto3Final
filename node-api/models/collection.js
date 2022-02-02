const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    employees: [{
        type: mongoose.SchemaTypes.String,
        ref: 'Employee'
    }],
    circuit: {
        type: mongoose.SchemaTypes.String,
        ref: 'Circuit'
    },
    dateStartTime: {
        type: Date,
        required: false,
    },
    dateEndTime: {
        type: Date,
        required: false
    },
    massaCollect_kg: {
        type: Number,
        required: false
    }
    
});

const collection = mongoose.model('Collection', collectionSchema);

module.exports = collection;