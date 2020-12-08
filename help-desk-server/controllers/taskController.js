const Task = require('../models/task');

const get_all_tasks = (req, res)=>{
    Task.find({})
    .then(tasks => res.json({error: 'loading_tasks_succeeded',tasks}))
    .catch(err => res.json({message: err.message}));
}
const get_tasks_by_technician = (req, res)=>{
    Task.find({technician: req.params.id})
    .then(tasks => res.json({error:'loading_task_successfully',tasks}))
    .catch(err => res.json({error: err.message}));
}

const add_new_task = (req, res) =>{
    console.log(req.body.task);
    const task = new Task(req.body.task);
    task.save()
    .then(task => res.json({error:'add_successfully',task}))
    .catch(err => res.json({error: err.message}));

}

const update_task = (req, res)=>{
    Task.findByIdAndUpdate({_id: req.params.id}, req.body.task)
    .then(()=> Task.findById({_id: req.params.id}))
    .then(task => res.json({error:'update_task_successfully',task}))
    .catch(err => res.json({error: err.message}));
}

const delete_task = (req, res)=>{
    Task.findOneAndRemove({_id: req.params.id})
    .then(task => res.json(task))
    .catch(err => res.json({message: err}));
}

module.exports = {get_all_tasks, add_new_task,get_tasks_by_technician,update_task, delete_task}