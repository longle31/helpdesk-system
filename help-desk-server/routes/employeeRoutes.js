const express = require('express');
const router = express.Router();
const {get_employees,get_employee_by_id,check_email, init_an_employee, update_employee_by_id,delete_employee}  = require('../controllers/employeeController');
const { requireAdminAuth } = require('../middlewares/authMiddleWare');

router.get('/employees',requireAdminAuth, get_employees);
router.get('/employees/:id',get_employee_by_id);
router.post('/employees',requireAdminAuth, init_an_employee);
router.put('/employees/:id',update_employee_by_id);
router.delete('/employees/:id',requireAdminAuth, delete_employee);
router.get('/employees/email/check', check_email);

module.exports = router;