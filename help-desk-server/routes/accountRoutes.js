const express = require('express');
const { get_all_accounts, get_an_account , create_new_account} = require('../controllers/accountController');
const router = express.Router();

router.get('/accounts', get_all_accounts);
router.get('/accounts/:username', get_an_account);
// router.post('/accounts', create_new_account)

module.exports = router;