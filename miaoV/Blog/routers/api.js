var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Content = require('../models/Content');
//统一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});
/*
* 用户注册
*   注册逻辑
*   1.用户名不能为空
*   2.两次输入密码必须一致
*
*   1.用户名是否已经被注册了
*       数据库查询
* */

router.post('/user/register', function (req, res) {
    var postData = req.body;
    //用户是否为空
    if (postData.username === '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
    } else if (postData.password === '') {//密码是否为空
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
    } else if (postData.password !== postData.repassword) {//密码是否一致
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
    } else {
        //用户名是否已经被注册了，如果数据苦衷已经存在和我们要注册的用户名同名的数据，表示该用户名已经被注册了
        User.findOne({username: postData.username})
            .then((userInfo) => {
                // console.log(userInfo);
                if (userInfo) {
                    //表示数据库中有该记录
                    responseData.code = 4;
                    responseData.message = '用户名已经被注册了';
                    res.json(responseData);
                    return null;
                } else {
                    //保存用户注册的信息到数据库中
                    delete postData.repassword;
                    var user = new User(postData);
                    return user.save();
                }
            })
            .then((newUserInfo) => {
                if (newUserInfo) {
                    responseData.message = '注册成功';
                    res.json(responseData);
                }
            })
            .catch((err) => {
                responseData.code = 5;
                responseData.message = '服务器der了，请重新注册';
                res.json(responseData);
            });
    }
});
/*
* 用户登录
* */
router.post('/user/login', function (req, res) {
    var postData = req.body;
    if (postData.username === '' || postData.password === '') {
        responseData.code = 1;
        responseData.message = '用户名和密码不能为空';
        res.json(responseData);
        return false;
    }
    //查询数据库中相同用户名和密码是否存在，如果存在则登录成功
    User.findOne(postData)
        .then((userInfo) => {
            if (!userInfo) {
                responseData.code = 2;
                responseData.message = '用户名和密码错误';
            } else {
                var temp = {
                    _id: userInfo._id,
                    username: userInfo.username
                };
                responseData.message = '登录成功';
                responseData.userInfo = temp;
                req.cookies.set('userInfo', JSON.stringify(temp));
            }
            res.json(responseData);
        })
        .catch((error) => {
            responseData.message = '服务器der了，请重新登录';
            res.json(responseData);
        });
});
/*
* 退出
* */
router.get('/user/logout', function (req, res) {
    req.cookies.set('userInfo', null);
    res.json(responseData);
});
/*
* 获取文章的指定评论
* */
router.get('/comment', function (req, res) {
    var _id = req.query.contentId || '';
    Content.findById(_id)
        .then((content) => {
            responseData.data = content;
            res.json(responseData);
        })
        .catch((e) => {
            // responseData.code = 1;
            // responseData.message = '博客内容获取失败';
            // res.json(responseData);
        });
});
/*
* 评论提交
* */
router.post('/comment/post', function (req, res) {
    //文章的Id
    var _id = req.body.contentId || '';
    var postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content
    };
    //查询当前这篇内容的信息
    // Content.findByIdAndUpdate(_id, {//返回的数据是更新前的
    //         $push: {
    //             comments: postData
    //         }
    //     }
    // )
    Content.update({_id}, {
            $push: {
                comments: postData
            }
        }
    )
        .then(() => {
            return Content.findById(_id);
        })
        .then((content) => {
            // content.comments.push(postData);//返回的数据是更新前的
            responseData.message = '评论成功';
            responseData.data = content;
            res.json(responseData);
        })
        .catch((e) => {
            responseData.message = '评论失败';
            responseData.code = 1;
            res.json(responseData);
            // console.log(e);
        });
});
module.exports = router;