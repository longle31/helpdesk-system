const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FQASchema = new Schema({
    fqaName:{
        type:String,
        required: true
    },
    detail:{
        type:String,
        required:true
    }
});

  
const solutionSchema = new Schema({
    solutionName:{
        type:String,
        required: true
    },
    detail:{
        type:String,
        required: true
    }
});

const taskSchema = new Schema({
    technician:{
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    report:{
        type: Schema.Types.ObjectId,
        ref: 'Report',
        required: true
    },
    taskName:{
        type: String,
        required: true,
    },
    status:{
        type: Number,// -1 denied, 0 solving , 1 finish
        required: true
    },
    detail:{
        type:String,
        required: false
    },
    FQA:{
        type: FQASchema
    },
    solution:{
        type: solutionSchema
    },
    progress:{
        type: Number // 1 - 100
    }

}, {timestamps:true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;