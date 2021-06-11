const Log = require("../model/Log")

module.exports = {
    //获取日志信息
    async getLogList(req, res, next) {
        const pageSize = 10 // 每页条数
        const pageNum = Number(req.query.p ? req.query.p : 1) // 当前页
        const list = await Log.getLogList(pageNum, pageSize)
        const total = (await Log.getLogCount())[0].total
        req.pageList = {
            pageNum,
            pageSize,
            total,
            pages: Math.ceil(total / pageSize),
            list
        }
        next()
    },
    async insertLog(req) {
        if (req.log) {
            let log = {
                    //登录
                    handle: req.log.handle,
                    //获取ip地址
                    // 它主要是切割字符串，结果返回由字符串元素组成的一个列表（用：分割字符串）{[限制长度]}
                    ip: req.ip.split(':')[3] ? req.ip.split(':')[3] : 'localhost',
                    time: new Date() //返回最新时间
                }
                //执行插入到日志中
            Log.insertLog(log)
        }
    }
}