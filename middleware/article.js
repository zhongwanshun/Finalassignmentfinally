const Article = require('../model/Article')
const Tab = require('../model/Tab')

module.exports = {
    // 获取热门文章
    //异步
    //async用于申明function异步，await用于等待一个异步方法执行完成
    async getHot(req, res, next) {
        //传递的参数是限制热门的数量
        req.hots = await Article.getHot(4)
        next() //执行下一个中间件
    },
    // 获取文章列表
    //async用于申明function异步，await用于等待一个异步方法执行完成
    async getArticles(req, res, next) {
        req.articles = await Article.getArticles()
        next()
    },
    // 获取指定类目的文章列表
    async getArticlesByCategoryId(req, res, next) {
        const categoryId = req.params.categoryId
        req.articles = await Article.getArticlesByCategoryId(categoryId)
        next()
    },

    // 搜索文章
    async getArticlesByKeyword(req, res, next) {
        const keyword = req.query.keyword
        req.articles = await Article.getArticlesByKeyword(keyword)
        next()
    },
    // 根据id查文章详情
    async getArticleDetailById(req, res, next) {
        const articleId = req.params.articleId
        req.article = (await Article.getArticleDetailById(articleId))[0]
        next()
    },
    // 根据文章id获取标签列表
    async getTabsByArticleId(req, res, next) {
        const articleId = req.params.articleId
        req.tabs = await Tab.getTabsByArticleId(articleId)
        next()
    },
    // 通过文章id查上一篇
    async getPreArticleById(req, res, next) {
        const articleId = req.params.articleId
        req.preArticle = (await Article.getPreArticleById(articleId))[0]
        next()
    },
    // 通过文章id查上一篇
    async getNextArticleById(req, res, next) {
        const articleId = req.params.articleId
        req.nextArticle = (await Article.getNextArticleById(articleId))[0]
        next()
    },
    // 后台文章列表
    async getArticlePageList(req, res, next) {
        const pageSize = 10 // 每页条数
        const pageNum = Number(req.query.p ? req.query.p : 1) // 当前页
        const { category, hot } = req.query
        const result = await Article.getArticlePageList(pageSize, pageNum, category, hot)
        const total = (await Article.getTotalArticle(category, hot))[0].totalArticle // 总条数
        req.pageList = {
            list: result,
            pageSize,
            pageNum,
            total,
            pages: Math.ceil(total / pageSize)
        }
        next()
    },
    // 设置热门文章
    async setHot(req, res, next) {
        const { id, hot } = req.query
        const result = await Article.setHot(id, hot)
        req.affectedRows = result.affectedRows
        next()
    },
    // 新增文章
    async insertArticle(req, res, next) {
        const { title, category_id, content, hot } = req.body
        const article = { title, category_id, content, hot: hot ? 1 : 0, thumbnail: req.uploadUrl ? req.uploadUrl : null }
        req.affectedRows = (await Article.insertArticle(article)).affectedRows
        next()
    },
    // 删除文章
    async deleteArticleById(req, res, next) {
        const id = req.query.id
        req.affectedRows = (await Article.deleteArticleById(id)).affectedRows
        next()
    },
    // 更新文章
    async updateArticleById(req, res, next) {
        const { id, title, category_id, content, hot, thumbnail } = req.body
        const article = { id, title, category_id, content, hot: hot ? 1 : 0, thumbnail: req.uploadUrl ? req.uploadUrl : thumbnail }
        req.affectedRows = (await Article.updateArticleById(article)).affectedRows
        next()
    }
}