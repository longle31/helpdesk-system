// add_new_device

const Device = require("../models/device");
const Employee = require('../models/employee');

const add_new_device =  (req, res) => {
    const device = new Device(req.body);
    device.employee = req.params.id;
    device.save()
    .then(device => res.json(device))
    .catch(err => res.json({message: err.message}));
}

const get_all_devices = (req, res) => {
    Device.find({})
        .then(devices => {
            if (devices.length > 0) {
                res.json({error: 'loading_succeeded',devices});
            }
            else res.json({ error: 'empty'});
        })
        .catch(err => res.json({ message: err.message }));
}

const get_devices_by_employee_id = (req, res) => {
    
    Device.find({ employee: req.params.id })
        .then(devices => res.json({error:'loading_devices_successfully', devices: devices}))
        .catch(err => res.json({ error: err.message }));
}
const update_a_device = async (req, res)=>{
    Device.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => Device.findById({_id: req.params.id}))
    .then(device => res.json(device))
    .catch(err => res.json({message: err}))
}
module.exports = { add_new_device, update_a_device,get_all_devices, get_devices_by_employee_id }