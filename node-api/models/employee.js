const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({

    _id: {
        type: String,

    },
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    permission: {
        type: String,
        required: true,
        default: "viewEmployee",
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true,
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;