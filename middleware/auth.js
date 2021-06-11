module.exports = {
    // 验证登录
    async getUser(req, res, next) {
        req.user = req.session.user
            //这时候并没有
        next()
    },

    // 允许进入后台
    allowToAdmin(req, res, next) {
        const user = req.session.user;
        if (user) {
            //如果匹配成功的话就进行登录
            req.user = user;
            next()
        } else {
            //否则返回登陆页面
            res.redirect('/user/login')
        }
    }
}