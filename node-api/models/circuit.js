const mongoose = require('mongoose');

const CircuitSchema = new mongoose.Schema({

    _id: {
        type: String,

    },
    container: [{
        type: mongoose.SchemaTypes.String,
        ref: 'Container'
    }],

});

const Circuit = mongoose.model('Circuit', CircuitSchema);

module.exports = Circuit;