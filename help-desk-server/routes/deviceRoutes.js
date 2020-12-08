const express = require('express');
const { add_new_device,update_a_device,get_devices_by_employee_id, get_all_devices } = require('../controllers/deviceController');

const router = express.Router();

router.post('/employees/:id/devices', add_new_device);
router.get('/devices', get_all_devices);
router.get('/employees/:id/devices', get_devices_by_employee_id);
router.put('/devices/:id', update_a_device);
module.exports = router;