const mongoose = require('mongoose');

const containerCollectionSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    collection: {
        type: mongoose.SchemaTypes.String,
        ref: 'Collection'
    },
    container: {
        type: mongoose.SchemaTypes.String,
        ref: 'Container'
    },
    key: {
        type: mongoose.SchemaTypes.String,
        ref: 'Key'
    }

});

const containerCollection = mongoose.model('containerCollection', containerCollectionSchema);

module.exports = containerCollection;