const Model = require('./Model')

class Tab extends Model {
    // 根据文章id获取标签列表
    static getTabsByArticleId(articleId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, `name` FROM tabs WHERE article_id=?'
            this.query(sql, [articleId])
                .then(resolve)
                .catch(reject)
        })
    }
}

module.exports = Tab;