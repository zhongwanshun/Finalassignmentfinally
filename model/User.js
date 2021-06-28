//数据库操作模块引入
const Model = require('./Model')
    //继承
class User extends Model {
    // 执行登录，需要将用户的用户名和用户的密码作为参数进行传入
    static doLogin(username, password) {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT id, username FROM `user` WHERE username=? AND `password`=?'
                    //给sql语句中的占位符进行赋值的参数数组（也就是两个问号)
                this.query(sql, [username, password])
                    //then方法中接受两个回调，一个成功的回调函数，一个失败的回调函数，并且能在回调函数中拿到成功的数据和失败的原因
                    .then(resolve)
                    //try  catch类似
                    //catch用来捕获异常的，也就是和then方法中接受的第二参数rejected的回调是一样的
                    .catch(reject)
            })
        }
        // 最后登录时间
    static lastLoginTime() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT `time` FROM log WHERE handle='登录' ORDER BY `time` DESC LIMIT 1"
            this.query(sql)
                .then(resolve)
                //try  catch类似
                //catch用来捕获异常的，也就是和then方法中接受的第二参数rejected的回调是一样的
                .catch(reject)
        })
    }
}

module.exports = User