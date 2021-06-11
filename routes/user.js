const express = require('express')
const log = require('../middleware/log')
const loginApp = express()
const User = require('../model/User')

// 渲染登录页面
loginApp.get('/login', (req, res) => {
    res.render('login.html', { msg: '' })
});
// 执行登录
loginApp.post('/login', async(req, res) => {
    //获取用户写入的用户名和密码
    const { username, password } = req.body;
    //await是async wait 线程等待wait的是resolve(data)的消息，并把数据data返回
    //执行了登陆操作---->进入中间件文件
    const user = (await User.doLogin(username, password))[0];

    if (user) {
        req.log = { handle: '登录' };
        //将登录操作插入到日志中
        log.insertLog(req);
        //node在登录后回将session保存在req.session.user上,
        //在后面需要权限的时候去取出来验证,
        //如果有req.session.user则通过验证，如果没有则提示登录。
        //有的话就重定向
        req.session.user = user.username;
        res.redirect('/');
    } else {
        //如果没有验证成功的话就提示登陆失败，并且继续保持下登陆页面
        res.render('login.html', { msg: '登录失败，账号或密码错误' });
    }
});

//执行退出登陆
loginApp.get('/logout', (req, res) => {
    //提示退出
    req.log = { handle: '退出' }
    log.insertLog(req)
        //通过对req.session.user进行重置
    req.session.user = ''
        //重定向回到首页
    res.redirect('/')
});

//对象导出
module.exports = loginApp