const express = require('express')
const log = require('../middleware/log');
const { getNextArticleById } = require('../model/Article');
const registerApp = express();
const User = require('../model/Register')


// 跳转至注册页面
registerApp.get('/', (req, res) => {
        res.render('register.html', { msg: '' });
    })
    //注册
registerApp.post('/register', async(req, res) => {
    const { username, password } = req.body;
    const user = (await User.doRegister(username, password))[0]
    if (req.body.password = req.body.repassword) {
        if (user == null) {
            req.log = { handle: '注册' }
            log.insertLog(req)
            req.session.user = user.username
            res.redirect('/')
        } else {
            res.render('register.html', { msg: '注册失败，用户已存在' })
        }
    }

})
registerApp.get('/logout', (req, res) => {
    req.log = { handle: '退出' }
    log.insertLog(req)
    req.session.user = ''
    res.redirect('/')
});

module.exports = registerApp;