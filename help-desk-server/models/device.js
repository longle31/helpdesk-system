const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deviceSchema = new Schema({
    deviceName: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    status: {
        type: Number,// 1: good working, 0: bad working, -1: crashed
        required: false
    },
    employee:{
        type: Schema.Types.ObjectId,
        ref:'Employee',
        required: true
    }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;

