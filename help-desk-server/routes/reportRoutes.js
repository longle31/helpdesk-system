const express = require('express');
const router = express.Router();
const {add_a_new_report,get_report_by_id,check_report_status, get_all_reports, update_report, delete_report, get_report_by_device, get_reports_by_employee}  = require('../controllers/reportController');

router.get('/reports',get_all_reports);
router.get('/reports/:id',get_report_by_id);
router.get('/reports/employee/:id',get_reports_by_employee);
router.get('/reports/device/:id',get_report_by_device);
router.get('/reports/:id/status', check_report_status);
router.post('/reports', add_a_new_report);
router.put('/reports/:id', update_report);
router.delete('/reports/:id', delete_report);

module.exports = router;

