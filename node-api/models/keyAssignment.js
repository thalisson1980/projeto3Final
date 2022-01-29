const mongoose = require('mongoose');

const keyAssignmentSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: false,
        default:null       
    }
});

const keyAssignment = mongoose.model('KeyAssignment', keyAssignmentSchema);

module.exports =keyAssignment;