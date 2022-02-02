const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        lowercase:true
    },
    gpsLocation:{
        type: String,
        required: true,
    },
    adress:{
        type: String,
        lowercase:true
    },
    ddccff:{
       type: String,
       required:true 
    } 
});

const container = mongoose.model('Container', containerSchema);

module.exports = container;