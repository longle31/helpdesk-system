const {Router} = require('express');
const {login_get, login_post, log_out} = require('./../controllers/authController');
const router = Router();

router.get('/login', login_get);
router.post('/login',login_post);
router.get('/logout', log_out);

module.exports = router;