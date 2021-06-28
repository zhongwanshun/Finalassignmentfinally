const Model = require('./Model')

class User extends Model {
    //注册
    static doRegister(username, password) {
        const sql = "insert into user(username,password) values('" + users.name + "','" + users.password + "');"
        this.query(sql, [username, password])
            //then方法中接受两个回调，一个成功的回调函数，一个失败的回调函数，并且能在回调函数中拿到成功的数据和失败的原因
            .then(resolve)
            //try  catch类似
            //catch用来捕获异常的，也就是和then方法中接受的第二参数rejected的回调是一样的
            .catch(reject)
    };
    // 最后登录时间
    static lastRegisterTime() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT `time` FROM log WHERE handle='登录' ORDER BY `time` DESC LIMIT 1"
            this.query(sql)
                .then(resolve)
                .catch(reject)
        })
    }
}

module.exports = User