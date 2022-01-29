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
    ocupation:{
        type: String,
        lowercase:true
    },
    ddccff:{
       type: String,
       required:true 
    } 
});

const container = mongoose.model('container', containerSchema);

module.exports = container;