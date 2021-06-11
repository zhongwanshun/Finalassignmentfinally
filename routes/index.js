const express = require('express')
const app = express()
const article = require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth')

app.get('/', [
    //获取文章热度
    article.getHot,
    //获取文章内容
    article.getArticles,
    //获取文章类别
    category.getCategories,
    //获取用户
    auth.getUser
], (req, res) => {
    const { hots, articles, categories, user } = req
    //第二个参数是需要展示在前端的数据
    res.render('index.html', { hots, articles, categories, user })
})

module.exports = app