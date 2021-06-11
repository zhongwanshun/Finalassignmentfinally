const Model = require('./Model')

class Pv extends Model {
    // 总访问量
    static getTotalHits() {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT SUM(hits) as totalHits FROM pv'
                this.query(sql)
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 访问量
    static getPv() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, time, hits FROM pv ORDER BY time ASC'
            this.query(sql)
                .then(resolve)
                .catch(reject)
        })
    }
}

module.exports = Pv