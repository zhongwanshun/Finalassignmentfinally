const Article = require("../model/Article")
const Category = require("../model/Category")
const Pv = require("../model/pv")

module.exports = {
    // 总点击量
    async getTotalHits(req, res, next) {
        const totalHits = await Pv.getTotalHits()
        req.totalHits = totalHits[0].totalHits
        next()
    },
    // 总文章数量
    async getTotalArticle(req, res, next) {
        const totalArticle = await Article.getTotalArticle()
        req.totalArticle = totalArticle[0].totalArticle
        next()
    },
    // 总类目数
    async getTotalCategory(req, res, next) {
        const totalCategory = await Category.getTotalCategory()
        req.totalCategory = totalCategory[0].totalCategory
        next()
    },
    // 点击量
    async getPv(req, res, next) {
        const pvs = await Pv.getPv()
        req.pvs = pvs
        next()
    }
}