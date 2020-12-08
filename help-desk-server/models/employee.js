const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{validator:(value)=>{
            const emailRex = /^[a-z]{1}\w{3,}@\w+(\.\w+)+/g;
            return emailRex.test(value);
        },message:'Please enter a valid email'}
    },
    birthDate: {
        type: Date,
        required: false
    },
    position: {
        type: String,
        required: true
    },
    technique :{
        type: String,
        required: false
    }
});
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;