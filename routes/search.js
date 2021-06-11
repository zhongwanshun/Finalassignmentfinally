const express = require('express')
const articleApp = express()
const article = require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth')

// 文章搜索(获取关键字)
articleApp.get('/', [article.getArticlesByKeyword, category.getCategories, auth.getUser], (req, res) => {
    const { articles, categories, user } = req;
    //将文章，类别，关键字，用户信息返回
    res.render('search.html', { articles, categories, keyword: req.query.keyword, user })
})

module.exports = articleApp