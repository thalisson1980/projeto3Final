const mongoose = require('mongoose');

const ContainerSchema = new mongoose.Schema({
    _id: {
        type: String,

    },
    container_cod: {
        type: String,
        required: true
    },
    gpsLocation: {
        type: String,
        // required: true
    },
    adress: {
        type: String,
        required: true
    },
     ddccff: {
         type: mongoose.SchemaTypes.String,
        ref: 'DDCCFF'
     }
});

const Container = mongoose.model('Container', ContainerSchema);

module.exports = Container;