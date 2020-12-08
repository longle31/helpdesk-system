const Employee = require('../models/employee');
const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const { max } = require('lodash');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) =>{
    return jwt.sign({id}, '11#0NG3!((',{
        expiresIn : maxAge
    });
   
}


const handleErrors = (err) =>{
    let errors = {username: '', password: ''};

    console.log(err);
    if(err.message === 'incorrect username'){
        errors.username = 'incorrect username';
    }
    if(err.message === 'incorrect password'){
        errors.password ='incorrect password';
    }

    return errors;
}

const login_post = async (req, res) => {
    const {username, password}  = req.body;
    try {
        const account = await Account.login(username, password);
        const token = createToken(account.employee);
        res.cookie('loadingToken', account.employee.toString(), {maxAge : maxAge*1000});
        res.cookie('auth', account.auth);
        res.cookie('jwt', token, {httpOnly : true, maxAge: maxAge*1000});
        res.status(200).json({employee: account.employee, auth: account.auth});
    } catch (error) {
        res.status(400).json({errors: handleErrors(error)});
    }
}
const login_get = (req, res) =>{
    res.render('login');
}
const log_out = (req, res) =>{
    res.cookie('jwt', '', {maxAge :1});
    res.cookie('loadingToken', '', {maxAge :1});
    res.cookie('auth', '', {maxAge :1});
    res.redirect('/login');
}
module.exports = {login_post,login_get, log_out}