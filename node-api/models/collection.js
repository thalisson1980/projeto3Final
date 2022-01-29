const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    collectionStartDate:{
        type: Date,
        required: false,
        default: Date.now
    }, 
    collectionEndDate:{
        type: Date,
        required: false,
        default: Date.now
    },
    massCollected_kg: {
        type: Number,
        required: true
    },
    circuito:{
        type:String,
        required:true
    }
    
});

const collection = mongoose.model('collection', collectionSchema);

module.exports = collection;