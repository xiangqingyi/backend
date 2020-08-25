let express = require('express');
let router = express.Router();
let appController = require('../../controllers/app/app');

// 用户登录
router.post('/login', appController.login);

// 用户注册
router.post('/register', appController.register);

module.exports = router;

