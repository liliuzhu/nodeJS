var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//用户的表结构
module.exports = new Schema({
    //关联字段--内容分类的id
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' //引用
    },
    //用户Id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //引用
    },
    //添加时间
    addTime: {
        type: Date,
        default: new Date()
    },
    //阅读量
    views: {
        type: Number,
        default: 0
    },
    title: String,//内容标题
    description: {//简介
        type: String,
        default: ''
    },
    content: {//内容
        type: String,
        default: ''
    },
    comments: {//数组
        type: Array,
        default: []
    }
});