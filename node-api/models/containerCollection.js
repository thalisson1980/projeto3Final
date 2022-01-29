const mongoose = require('mongoose');

const containerCollectionSchema = new mongoose.Schema({
    container: {
        type: String,
        required: true
    },
    collectionID: {
        type: String,
        required:true
    },
    key: {
        type: String,
        required: true,
        lowercase:true
    } 
    
});

const containerCollection = mongoose.model('containerCollection', containerCollectionSchema);

module.exports = containerCollection;