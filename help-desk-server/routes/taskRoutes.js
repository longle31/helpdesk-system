const express = require('express');
const { get_all_tasks, add_new_task, get_tasks_by_technician, update_task, delete_task } = require('../controllers/taskController');

const router = express.Router();


router.get('/tasks', get_all_tasks);
router.get('/tasks/')
router.get('/tasks/technician/:id', get_tasks_by_technician);
router.put('/tasks/:id', update_task);
router.post('/tasks', add_new_task);
router.delete('/tasks/:id', delete_task);


module.exports = router;