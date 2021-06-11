const mysql = require('mysql')
    // 数据模型的基类
    // 封装了数据库操作
    //直接进行导出
module.exports = class Model {
    // 初始化连接对象
    static conn = null
        // 连接数据库
    static connect() {
            //类里面的conn对象进行连接数据库操作
            Model.conn = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '1234',
                database: 'blog'
            })
            Model.conn.connect(err => {
                if (err) {
                    console.log('数据库连接失败')
                    console.log(err)
                }
            })
        }
        // 关闭连接
    static close() {
            //当数据库处于一个打开状态的时候进行end()操作
            if (Model.conn != null) {
                Model.conn.end()
            }
        }
        // 定义一个通用查询方法
        //{string} sql 要执行的SQL语句
        //{Array} params 给SQL语句的占位符进行赋值的参数数组
    static query(sql, params = []) {
        //Promise 是异步编程的一种解决方案，其实是一个构造函数，
        //自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。
        // Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
        //状态控制（用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多）
        return new Promise((resolve, reject) => {
            this.connect()
                //得到一个promise对象，然后通过调用这个对象的then和catch方法
                // then里面的函数就跟我们平时的回调函数一个意思
                // reject就是失败的时候的回调，他把promise的状态修改为rejected
            Model.conn.query(sql, params, (err, res) => {
                if (err) {
                    //失败的时候的回调
                    // reject就是失败的时候的回调，他把promise的状态修改为rejected，这样我们在then中就能捕捉到，
                    // 然后执行“失败”情况的回调。
                    reject(err)
                } else {
                    //成功的时候的回调
                    resolve(res)
                }
            })
            this.close()
        })
    }
}