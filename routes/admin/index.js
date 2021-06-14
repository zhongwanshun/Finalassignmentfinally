const express = require('express')
const indexApp = express()
const userModule = require('../../middleware/user')
const count = require('../../middleware/count')

indexApp.get('/', [
        // 最后登录时间
        userModule.lastLoginTime,
        // 总点击量
        count.getTotalHits,
        // 总类目数
        count.getTotalCategory,
        // 总文章数量
        count.getTotalArticle
    ], (req, res) => {
        const { user, lastLoginTime, totalHits, totalArticle, totalCategory } = req;
        // 讲请求到的信息返回给后台管理的主页面
        res.render('admin/index.html', { user, lastLoginTime, totalHits, totalArticle, totalCategory })
    })
    // 图表json数据
indexApp.get('/getPvs', count.getPv, (req, res) => {
    const { pvs } = req
    const data = {}
    data.start = pvs[0].time
    data.end = pvs[pvs.length - 1].time
    data.data = pvs
    res.json(data)
})

module.exports = indexApp