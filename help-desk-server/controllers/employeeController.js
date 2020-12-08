// get_employees

const Account = require('../models/account');
const Employee = require('../models/employee');
const randomString = require('random-string');

const get_employees = (req, res) => {

    Employee.find({})
        .then(result => {
            if (result.length > 0)
                res.json({ error: 'loading_succeeded', employees: result });
            else res.json({ error: 'employees_empty' });

        })
        .catch(err => res.json({ error: err }));

}

const init_an_employee = (req, res) => {
    const emp = new Employee(req.body.employee);
    const username = (emp.position === 'manager' ? 'mng_' : (emp.position === 'technician' ? 'tech_' : 'emp_'))
        + emp.name.substring(emp.name.lastIndexOf(' ') + 1, emp.name.length).trim().toLowerCase().replace(' ', '_') + '_'
        + randomString({ letters: true, length: 2, special: false });
    const password = username;
    const auth = emp.position === 'manager' ? 0 : (emp.position === "technician" ? -1 : -2);
    const acc = new Account({ username, password, employee: emp._id, auth });
    emp.save()
        .then(emp => acc.save())
        .then(ac => res.json({ employee: emp, error: 'add_employee_successfully' }))
        .catch(err => res.json({ error: err.message }));
}

const update_employee_by_id = (req, res) => {
   
    Employee.findByIdAndUpdate({ _id: req.params.id }, req.body.employee)
        .then(() => Employee.findOne({ _id: req.params.id }))
        .then(emp => res.json({ error: 'update_successfully', employee: emp }))
        .catch(err => res.json({ error: err.message }));
}
const delete_employee = (req, res) => {
    Employee.findByIdAndDelete({ _id: req.params.id })
        .then(emp => res.send(emp))
        .catch(err => res.send(err));
}
const get_employee_by_id = (req, res) => {
    Employee.findById({ _id: req.params.id })
        .then(emp => res.json({ error: 'load_successfully', employee: emp }))
        .catch(err => res.json({ erro: err.message }));
}

const check_email = (req, res) =>{
   
    Employee.findOne({email: req.query.email})
    .then(emp => res.json({error: 'invalid_email', email: emp.email}))
    .catch(error => res.json({error: 'valid_email'}));
}

module.exports = { get_employees, init_an_employee, check_email, update_employee_by_id, get_employee_by_id, delete_employee };  