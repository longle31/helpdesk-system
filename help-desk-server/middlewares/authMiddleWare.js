
const jwt = require('jsonwebtoken');
const Account = require('../models/account');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, '11#0NG3!((', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login');
    }


}

const requireAdminAuth  =  (req, res, next) => {

    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, '11#0NG3!((',async (err, decodedToken) => {
            if (err) {
                res.redirect('/404');
            } else {
                const emp = await Account.findOne({employee: decodedToken.id}).select('auth');
                if(parseInt(emp.auth) === 0){
                    next();
                }
                else
                res.redirect('/404');
            }
        })
    } else {
        res.redirect('/404');
    }
}

const checkEmployee = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, '11#0NG3!((', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.employee = null;
                next();
            } else {
                let employee = await Account.findOne({ employee: decodedToken.id });
                res.locals.employee = employee;
                next();
            }
        });
    } else {
        res.locals.employee = null;
        next();
    }
}

module.exports = { requireAuth,requireAdminAuth, checkEmployee }