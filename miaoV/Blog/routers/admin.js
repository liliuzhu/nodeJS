var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');

router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        //如果当前用户是非管理员
        res.send('对不起只有管理员才可以进入后台管理');
        return;
    }
    next();
});
/*
* 首页
* */
router.get('/', function (req, res) {
    res.render('admin/index.html', {
        userInfo: req.userInfo
    });
});
/*
* 用户管理
* */
router.get('/user', function (req, res) {
    /*
    * 从数据库中读取所有的用户数据
    *
    * limit(Number) : 限制获取的数据条数
    * skip(Number): 忽略的数据条数
    * 1：1-2 skip:0  ->（当前页-1）*limit
    * 2: 3-4 skip:2
    * */
    var page = Number(req.query.page || 1);
    var limit = 2;
    var pages = 0;
    var count = 0;
    User.count()
        .then((counts) => {
            count = counts;
            //计算总页数
            pages = Math.ceil(count / limit);
            //取值不能大于pages
            page = Math.min(page, pages);
            //取值不能小于1
            page = Math.max(page, 1);
            var skip = (page - 1) * limit;
            return User.find().limit(limit).skip(skip);
        })
        .then((users) => {
            res.render('admin/user_index.html', {
                userInfo: req.userInfo,
                router:'user',
                users,
                count, page, pages, limit
            });
        });
});
/*
* 首页分类
* */
router.get('/category', function (req, res) {
    /*
    * 从数据库中读取所有的分类
    *
    * limit(Number) : 限制获取的数据条数
    * skip(Number): 忽略的数据条数
    * 1：1-2 skip:0  ->（当前页-1）*limit
    * 2: 3-4 skip:2
    * */
    var page = Number(req.query.page || 1);
    var limit = 2;
    var pages = 0;
    var count = 0;
    Category.count()
        .then((counts) => {
            count = counts;
            //计算总页数
            pages = Math.ceil(count / limit);
            //取值不能大于pages
            page = Math.min(page, pages);
            //取值不能小于1
            page = Math.max(page, 1);
            var skip = (page - 1) * limit;
            /*
            * 1：升序
            * -1：降序
            * */
            return Category.find().sort({_id: -1}).limit(limit).skip(skip);
        })
        .then((categories) => {
            res.render('admin/category_index.html', {
                userInfo: req.userInfo,
                router:'category',
                categories,
                count, page, pages, limit
            });
        });
});
/*
* 分类的添加
* */
router.get('/category/add', function (req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    });
});
/*
* 分类的保存
* */
router.post('/category/add', function (req, res) {
    var name = req.body.name || '';
    if (name === '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
        return;
    }
    //数据库中是否已经存在同名分类名称
    Category.findOne({name})
        .then((info) => {
            if (info) {
                //数据库中已经存在该分类了
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '分类已经存在'
                });
                return Promise.reject();
            } else {
                //数据库中不存在该分类
                return new Category({name}).save();
            }
        })
        .then((newinfo) => {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '分类保存成功',
                url: '/admin/category'
            });
        });
});
/*
* 分类的修改
* */
router.get('/category/edit', function (req, res) {
    //获取要修改的分类的信息，并且用表单的形式展示出来
    var _id = req.query.id || '';
    //获取要修改的分类信息
    // Category.findById(id)
    Category.findOne({_id})
        .then((category) => {
            if (!category) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '分类信息不存在'
                });
                return Promise.reject();
            } else {
                res.render('admin/category_edit', {
                    userInfo: req.userInfo,
                    category
                });
            }
        });
});
/*
* 分类的修改保存
* */
router.post('/category/edit', function (req, res) {
    //获取要修改的分类信息，并且用表单的形式展现出来
    var _id = req.query.id || '';
    //获取post提交过来的名称
    var name = req.body.name || '';
    //获取要修改的分类信息
    Category.findOne({_id})
        .then((category) => {
            if (!category) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '分类信息不存在'
                });
                return Promise.reject();
            } else {
                /*
                //当用户没有做任何的修改提交的时候
                if (name === category.name) {
                    // res.redirect('/admin/category');
                    res.render('admin/success', {
                        userInfo: req.userInfo,
                        message: '修改成功'
                    });
                    return Promise.reject();
                } else {
                    //要修的分类名称是否已经在数据库中存在
                    return Category.findOne({
                        _id: {$ne: _id},
                        name
                    });
                }*/
                return Category.findOne({name});
            }
        })
        .then((info) => {
            if (info) {
                //数据库中已经存在该分类了
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '数据库中已经存在同名分类'
                });
                return Promise.reject();
            } else {
                //数据库中不存在该分类
                return Category.update({_id}, {name});
            }
        })
        .then((newinfo) => {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '分类修改成功',
                url: '/admin/category'
            });
        });
});
/*
* 分类的删除
* */
router.get('/category/delete', function (req, res) {
    var _id = req.query.id || '';
    Category.remove({_id})
        .then(() => {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '删除成功',
                url: '/admin/category'
            });
        });
});
/*
* 内容首页
* */
router.get('/content', function (req, res) {
    // res.render('admin/content_index', {
    //     userInfo: req.userInfo
    // });


    var page = Number(req.query.page || 1);
    var limit = 2;
    var pages = 0;
    var count = 0;
    Content.count()
        .then((counts) => {
            count = counts;
            //计算总页数
            pages = Math.ceil(count / limit);
            //取值不能大于pages
            page = Math.min(page, pages);
            //取值不能小于1
            page = Math.max(page, 1);
            var skip = (page - 1) * limit;
            return Content.find().sort({_id: -1}).limit(limit).skip(skip).populate(['category','user']);
        })
        .then((contents) => {
            res.render('admin/content_index.html', {
                userInfo: req.userInfo,
                router:'content',
                contents,
                count, page, pages, limit
            });
        });
});
/*
* 内容添加页面
* */
router.get('/content/add', function (req, res) {
    Category.find().sort({_id: -1}).then((categories) => {
        res.render('admin/content_add', {
            userInfo: req.userInfo,
            categories
        });
    });
});
/*
* 内容保存
* */
router.post('/content/add', function (req, res) {
    if (req.body.category === '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类信息不能为空'
        });
        return;
    }
    if (req.body.title === '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        });
        return;
    }
    //保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        user:req.userInfo._id
    }).save().then((newInfo) => {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        });
    });
});
/*
* 修改内容
* */
router.get('/content/edit', function (req, res) {
    var _id = req.query.id || '';
    var categories = null;
    Category.find().sort({_id: -1})
        .then((categorys) => {
            categories = categorys;
            return Content.findOne({_id}).populate('category');
        })
        .then((content) => {
            if (!content) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '指定内容不存在'
                });
                return Promise.reject();
            } else {
                res.render('admin/content_edit', {
                    userInfo: req.userInfo,
                    content, categories
                });
            }
        });
});
/*
* 保存修改内容
* */
router.post('/content/edit', function (req, res) {
    var _id = req.query.id || '';
    if (req.body.category === '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类信息不能为空'
        });
        return;
    }
    if (req.body.title === '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        });
        return;
    }
    Content.update({
        _id
    }, {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    })
        .then((newInfo) => {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '内容保存成功',
                url: '/admin/content'
            });
        });
});
/*
* 内容删除
* */
router.get('/content/delete', function (req, res) {
    var _id = req.query.id || '';
    Content.remove({_id})
        .then(() => {
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '删除成功'
            });
        });
});
module.exports = router;