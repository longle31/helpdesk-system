/// get_all_accounts get_an_account post_account put_account 
const randomString = require('random-string');

const md5 = require('md5');
const Account = require('../models/account');

const generate_password = (password) => {
    return "$1$" + randomString({ length: 6, letters: true, numberic: true, special: false }) + '$' + md5(password);
}

const get_all_accounts = (req, res) => {
    Account.find({})
        .then(accs => {
            if (accs.length > 0) {
                res.send(accs);
            } else res.send('no account');
        })
        .catch(err => res.send(err));
}

const create_new_an_account = (req, res) => {
    const account = new Account(req.body);
    account.password = "$1$" + randomString({ length: 6, letters: true, numberic: true, special: false }) + '$' + md5(account.password);
    account.save()
        .then(acc => res.status(200).json(acc))
        .catch(err => res.send(err));
}

const get_an_account = (req, res) => {
    if (!req.params.username) {
        Account.findOne({ username: req.body.username })
            .then(acc => res.json(acc))
            .catch(err => res.json({ message: err.message }));
    }
    else {
        Account.findOne({ username: req.params.username })
            .then(acc => res.json(acc))
            .catch(err => res.json({ message: err.message }));
    }


}

const change_password = (req, res) => {
    if (req.body.password) {
        const password = generate_password(req.body.password);
        Account.findByIdAndUpdate({ username: req.body.username }, { password })
            .then(acc => res.send({ message: 'change password successfully!' }))
            .catch(err => res.send(err));
    }
}

const delete_account = (req, res) => {
    Account.findByIdAndRemove({ _id: req.params.username })
        .then(acc => res.send(acc))
        .catch(err => res.send(err));
}

module.exports = { get_all_accounts, delete_account, change_password, get_an_account, generate_password, create_new_an_account }
