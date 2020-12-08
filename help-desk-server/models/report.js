const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reportDate:{
        type: Date,
        required: false
    },
    title:{
        type: String,
        required: true
    },
    detail:{
        type:String,
        required : true
    },
    employee:{
        type: Schema.Types.ObjectId ,
        ref : 'Employee',
        required: true
    },
    device:{
        type: Schema.Types.ObjectId,
        ref : 'Device',
        required: true
    }
    ,
    status:{
        type: Number,//0 :new , 1 : solving, 2: solved
        required:true
    },
    severity:{
        type :Number,
        required : false // 1 emergency ; 2: serious; 3 not serious
    }
}, {timestamps: true});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;