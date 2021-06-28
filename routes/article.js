const express = require('express')
const articleApp = express()
const article = require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth')

//使用中间件（获取全部类内容,获取用户是否走验证登陆---->决定能不能修改)
articleApp.use(category.getCategories, auth.getUser)



// 根据类目展示文章(导航栏处的类进行显示)
articleApp.get('/list/:categoryId', [article.getArticlesByCategoryId, category.getCategoryNameById], (req, res) => {
    const { articles, categories, categoryName, user } = req
    //articles, categories, categoryName, user作为参数传递给list.html页面
    res.render('list.html', { articles, categories, categoryName, user })
});

// 文章详情显示,根据文章匹配的文章序号
articleApp.get('/detail/:articleId/', [
    //根据id显示文章详情
    article.getArticleDetailById,
    // 根据文章id获取标签列表
    article.getTabsByArticleId,
    //获取前一篇文章的ID
    article.getPreArticleById,
    //获取下一篇文章的ID
    article.getNextArticleById
], (req, res) => {
    // 将文章，类别，列表，前一篇，后一篇，用户作为参数传入
    const { article, categories, tabs, preArticle, nextArticle, user } = req
    res.render('article.html', { article, categories, tabs, preArticle, nextArticle, user })
})
module.exports = articleApp