/*
业务模块
*/
const path = require('path');
//引入连接数据库
const sq = require('./sq.js');
//引入读取文件的操作
const fs = require('fs');



// 渲染登陆页面
exports.showLogin = (req, res) => {
    res.render('login');
};

//获取用户名和密码
exports.getUserinfo = (req, res) => {
    let sql = "select * from users where username='" + req.body.name + "' and password='" + req.body.pass + "'";
    // let sql = `select * from userinfo where username=? and userpwd=?`
    // let data = [req.body.name, req.body.pass];
    sq.base(sql, [], (results) => {
        if (results.length >= 1) { //req.body.name == results.name && req.body.pass == this.password
            // console.log(results.RowDataPacket);
            // console.log(results);
            // console.log(results != null)
            // console.log(results.this);
            res.render('')
        } else if (results.this == undefined) {
            res.render('notfind');
            // console.log("用户并未找到");
            //     // res.render('notfind');
            // console.log(results);
            //     // console.log(error);
            //     console.log(req.body.name, req.body.pass);
            // } else {
            //     res.rend("用户信息不存在")
            // console.log(req.body.name)
            // console.log(req.body.pass)
            // console.log(results.username)
            // res.render('index');
        }
    })
};
//获取用户输入的信息并且进行判断
// exports.showUserinfo = (req, res) => {
//         let username = req.body.name;
//         let password = req.body.pass;
//         let sql = `select * from userinfo where name=? password=?`;
//         let data = [username, password];
//     }



//显示主页面
exports.showIndex = (req, res) => {
    res.render('/')
};

//跳转到注册页面
exports.toRegister = (req, res, next) => {
    res.render('register');
};

//实现用户注册(需要将数据传入数据库)


exports.insertInfoUser = (req, res) => {
    let info = req.body;
    let users = {};
    for (let key in info) {
        users[key] = info[key];
    }
    let sql = "insert into user(username,password) values('" + users.name + "','" + users.password + "');"
        // insert into users(username,password) values('高宇锦','333','333')
    sq.base(sql, users, (results) => {
        if (results.affectedRows == 1) {
            res.redirect('/');
        }
    })
}