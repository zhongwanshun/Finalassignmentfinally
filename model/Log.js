const Model = require('./Model')

class Log extends Model {
    // 总条数
    static getLogCount() {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT COUNT(1) as total FROM log'
                this.query(sql)
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 日志列表
    static getLogList(pageNum, pageSize) {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT id, handle, `time`, ip FROM log ORDER BY `time` DESC LIMIT ?, ?'
                this.query(sql, [(pageNum - 1) * pageSize, pageSize])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 新增日志
    static insertLog(log) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO log SET ?'
            this.query(sql, log)
                .then(resolve)
                .catch(reject)
        })
    }
}

module.exports = Log