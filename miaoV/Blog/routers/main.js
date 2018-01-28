var express = require('express');
var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');
var data;
/*
* 处理通用数据
* */
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,
        category: req.query.category || '',
        categories: [],
    };
    //读取所有的分类信息
    Category.find()
        .then((categories) => {
            data.categories = categories;
            next();
        })
        .catch(function () {
            next();
        });
});
/*
* 首页
* */
router.get('/', function (req, res, next) {
    var temp = {
        contents: [],
        page: Number(req.query.page || 1),
        limit: 2,
        pages: 0,
        count: 0
    };
    Object.assign(data, temp);
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    Content.where(where).count()
        .then((count) => {
            data.count = count;
            //计算总页数
            data.pages = Math.ceil(count / data.limit);
            //取值不能大于pages
            data.page = Math.min(data.page, data.pages);
            //取值不能小于1
            data.page = Math.max(data.page, 1);
            var skip = (data.page - 1) * data.limit;

            return Content.where(where).find().sort({_id: -1}).limit(data.limit).skip(skip).populate(['category', 'user']).sort({addTime: -1});
        })
        .then((contents) => {
            data.contents = contents;
            res.render('main/index.html', data);
        })
});
router.get('/view', function (req, res) {
    var _id = req.query.contentId || '';
    Content.findOne({_id})
        .then((content) => {
            data.content = content;

            content.views++;
            content.save();

            res.render('main/view', data);
        });
});

module.exports = router;