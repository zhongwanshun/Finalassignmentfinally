const Category = require('../model/Category')
    //同时进行全部导出
module.exports = {
    // 获取全部类目
    async getCategories(req, res, next) {
        req.categories = await Category.getCategories()
        next()
    },
    // 根据id获取类目名称
    async getCategoryNameById(req, res, next) {
        const categoryId = req.params.categoryId
        req.categoryName = (await Category.getCategoryNameById(categoryId))[0].name
        next()
    },
    // 新增类目
    async insertCategory(req, res, next) {
        req.affectedRows = (await Category.insertCategory(req.body)).affectedRows
        next()
    },
    // 更新类目
    async updateCategory(req, res, next) {
        const { id, name, index } = req.body
        req.affectedRows = (await Category.updateCategory(id, name, index))
        next()
    },
    // 删除类目
    async deleteCategory(req, res, next) {
        req.affectedRows = (await Category.deleteCategory(req.query.id))
        next()
    }
}