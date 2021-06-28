/**
 * 路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('./service.js');




/*
路由处理
*/
//进入注册页面
router.get('/register', service.toRegister);

router.post('/register', service.insertInfoUser);


module.exports = router;