const Model = require('./Model')

class Article extends Model {
    // 获取热门文章
    static getHot(num) {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT id, title, content, `time`, thumbnail FROM article WHERE hot = 1 LIMIT ?'
                this.query(sql, [num])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 获取文章列表
    static getArticles() {
            //利用promise来控制高并发，因为他有三个状态（完成，未完成，失败)，并且状态可以由未完成到完成，或者从未完成到失败，而且这个状态只会发生一次
            return new Promise((resolve, reject) => {
                //根据时间降序显示（注意同时获取了缩略图)
                const sql = 'SELECT id, title, content, `time`, thumbnail FROM article ORDER BY `time` DESC'
                this.query(sql)
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 获取指定类目的文章列表（根据指定类的id)
    static getArticlesByCategoryId(categoryId) {
            //利用promise来控制高并发，因为他有三个状态（完成，未完成，失败)，
            // 并且状态可以由未完成到完成，或者从未完成到失败，而且这个状态只会发生一次（更安全)
            return new Promise((resolve, reject) => {
                //根据时间降序排列
                const sql = 'SELECT id, title, content, `time`, thumbnail FROM article WHERE category_id=? ORDER BY `time` DESC'
                this.query(sql, [categoryId])
                    //就类似一个回调函数一样
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 文章搜索根据用户输入的关键字[查询]
    static getArticlesByKeyword(keyword) {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT id, title, content, `time`, thumbnail FROM article WHERE title LIKE ? ORDER BY `time` DESC'
                    // 对这个关键词进行模糊匹配
                this.query(sql, [`%${keyword}%`])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 文章详情
    static getArticleDetailById(articleId) {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT a.id, a.title, a.content, a.hits, a.hot, a.`time`, a.category_id, a.thumbnail, c.`name` AS category_name FROM article a, category c WHERE a.id=? AND a.category_id = c.id'
                this.query(sql, [articleId])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 通过文章id查上一篇
    static getPreArticleById(articleId) {
            return new Promise((resolve, reject) => {
                //id小于现在的ID并且设置数量只能为一个
                const sql = 'SELECT id, title FROM article WHERE id < ? ORDER BY id DESC LIMIT 1'
                this.query(sql, [articleId])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 通过文章id查下一篇
    static getNextArticleById(articleId) {
            return new Promise((resolve, reject) => {
                //id大于现在的ID并且设置数量只能为一个
                const sql = 'SELECT id, title FROM article WHERE id > ? ORDER BY id ASC LIMIT 1'
                this.query(sql, [articleId])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 总文章数
    static getTotalArticle(categoryId, hot) {
            return new Promise((resolve, reject) => {
                //初始化
                let query = ''
                    //如果文章 id存在，并且文章id不等于-1
                if (categoryId && categoryId != -1) {
                    //拼接一下字符串
                    query += ' AND category_id=' + categoryId
                }
                if (hot && hot != -1) {
                    query += ' AND hot=' + hot
                }
                const sql = 'SELECT COUNT(1) as totalArticle FROM article WHERE 1=1' + query
                this.query(sql)
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 后台文章列表
    static getArticlePageList(pageSize, pageNum, categoryId, hot) {
            return new Promise((resolve, reject) => {
                let query = ''
                if (categoryId && categoryId != -1) {
                    query += ' AND category_id=' + categoryId
                }
                if (hot && hot != -1) {
                    query += ' AND hot=' + hot
                }
                const sql = 'SELECT id, title, thumbnail, hot FROM article WHERE 1=1' + query + ' ORDER BY time DESC LIMIT ?, ?'
                this.query(sql, [(pageNum - 1) * pageSize, pageSize])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 设置热门文章
    static setHot(id, hot) {
            return new Promise((resolve, reject) => {
                const sql = 'UPDATE article SET hot=? WHERE id=?'
                this.query(sql, [hot, id])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 新增文章
    static insertArticle(article) {
            return new Promise((resolve, reject) => {
                const sql = 'INSERT INTO article SET ?'
                this.query(sql, [article])
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 删除文章
    static deleteArticleById(articleId) {
            return new Promise((resolve, reject) => {
                const sql = 'DELETE FROM article WHERE id=?'
                this.query(sql, articleId)
                    .then(resolve)
                    .catch(reject)
            })
        }
        // 更新文章
    static updateArticleById(article) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE article SET title=?, content=?, hot=?, category_id=?, thumbnail=? WHERE id=?'
            this.query(sql, [article.title, article.content, article.hot, article.category_id, article.thumbnail, article.id])
                .then(resolve)
                .catch(reject)
        })
    }
}

module.exports = Article