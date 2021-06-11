const User = require("../model/User")

module.exports = {
  async lastLoginTime(req, res, next) {
    const lastLoginTime = await User.lastLoginTime()
    req.lastLoginTime = lastLoginTime[0].time
    next()
  }
}