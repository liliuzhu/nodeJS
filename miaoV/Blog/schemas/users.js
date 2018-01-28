var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//用户的表结构
module.exports = new Schema({
    username: String,//用户名
    password: String,//密码
    isAdmin: {
        type: Boolean,
        default: false
    }
});