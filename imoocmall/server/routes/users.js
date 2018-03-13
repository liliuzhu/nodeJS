var express = require('express');
var router = express.Router();

require('./../util/util');

let User = require('../models/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
/* login 登录 */
router.post('/login', function (req, res, next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    };
    User.findOne(param)
        .then((doc) => {
            if (doc) {
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                // req.session.user = doc;
                res.json({
                    status: 0,
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                });
            } else {
                res.json({
                    status: 1,
                    msg: '密码错误'
                });
            }
        })
        .catch((err) => {
            res.json({
                status: 1,
                msg: err.message
            });
        });
});
/* 登出 */
router.post('/logout', function (req, res, next) {
    res.cookie('userId', '', {
        parh: '/',
        maxAge: -1
    });
    res.json({
        status: 0,
        msg: '登出成功',
        result: ''
    });
});
/* 校验 */
router.get('/checkLogin', function (req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: 0,
            msg: '已登陆',
            result: req.cookies.userName || ''
        });
    } else {
        res.json({
            status: 1,
            msg: '未登录',
            result: ''
        });
    }
});
/* 获取商品数量 */
router.get('/getCartCount', (req, res, next) => {
    let userId = req.cookies.userId;
    User.findOne({userId})
        .then(doc => {
            if (doc) {
                let cartCount = 0;
                doc.cartList.forEach((item) => {
                    cartCount += Number.parseInt(item.productNum);
                });
                res.json({
                    status: 0,
                    msg: '',
                    result: cartCount
                });
            } else {
                return Promise.reject({message: '出错了！'});
            }
        })
        .catch(err => {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        });
});
/* 购物车列表 */
router.get('/cartList', function (req, res, next) {
    let userId = req.cookies.userId;
    User.findOne({userId})
        .then((doc) => {
            if (doc) {
                res.json({
                    status: 0,
                    msg: '',
                    result: doc.cartList
                });
            } else {
                res.json({
                    status: 1,
                    msg: '未找到登录人',
                    result: ''
                });
            }
        })
        .catch((err) => {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        });
});
/* 购物车删除 */
router.post('/cartDel', (req, res, next) => {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    User.update({userId}, {$pull: {cartList: {productId}}})
        .then((doc) => {
            res.json({
                status: 0,
                msg: '',
                result: doc
            });
        })
        .catch((err) => {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        });
});
/* 商品数量编辑 */
router.post("/cartEdit", (req, res, next) => {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let productNum = req.body.productNum;
    let checked = req.body.checked;
    User.update({userId, 'cartList.productId': productId}, {
        'cartList.$.productNum': productNum,
        'cartList.$.checked': checked
    })
        .then((doc) => {
            res.json({
                status: 0,
                msg: '',
                result: doc
            });
        })
        .catch((err) => {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        });
});
/* 全选不全选 */
router.post('/editCheckAll', (req, res, next) => {
    let userId = req.cookies.userId;
    let checkAll = req.body.checkAll;
    User.findOne({userId})
        .then((user) => {
            if (user) {
                user.cartList.forEach((item) => {
                    item.checked = checkAll;
                });
                return user.save();
            } else {
                return Promise.reject({message: '出错了'});
            }
        })
        .then((doc) => {
            res.json({
                status: 0,
                msg: '',
                result: doc.cartList
            });
        })
        .catch((err) => {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        });
});
/* 查询用户地址接口 */
router.get('/addressList', (req, res, next) => {
    let userId = req.cookies.userId;
    User.findOne({userId})
        .then((doc) => {
            res.json({
                status: 0,
                msg: '',
                result: doc.addressList.sort((a, b) => {
                    return b.isDefault - a.isDefault;
                })
            });
        })
        .catch((err) => {
            res.json({
                status: 1,
                msg: err || err.message || '',
                result: ''
            });
        });
});
/* 设置默认地址 */
router.post('/setDefault', (req, res, next) => {
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;
    if (!addressId) {
        res.json({
            status: 1003,
            msg: 'addressId is null',
            result: ''
        });
    } else {
        User.findOne({userId})
            .then((doc) => {
                let addressList = doc.addressList;
                addressList.forEach((item) => {
                    item.isDefault = item.addressId === addressId ? true : false;
                });
                return doc.save();
            })
            .then((doc) => {
                if (doc) {
                    res.json({
                        status: 0,
                        msg: '',
                        result: doc.addressList
                    });
                } else {
                    return Promise.reject({message: '出错了'});
                }
            })
            .catch((err) => {
                res.json({
                    status: 1,
                    msg: err.message,
                    result: ''
                });
            });
    }
});
/* 删除地址 */
router.post('/delAddress', (req, res, next) => {
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;
    User.update({userId}, {$pull: {addressList: {addressId}}})
        .then((doc) => {
            res.json({
                status: 0,
                msg: '',
                result: doc
            });
        })
        .catch((err) => {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        });
});
/* 支付 */
router.post('/payMent', (req, res, next) => {
    let userId = req.cookies.userId;
    let orderTotal = req.body.orderTotal;
    let addressId = req.body.addressId;
    let userPromise = User.findOne({userId});
    userPromise.then((doc) => {
        if (doc) {
            let address = '';
            /* 获取当前用户的地址信息 */
            doc.addressList.forEach((item) => {
                if (addressId === item.addressId) {
                    address = item;
                }
            });
            /* 获取用户购物车的购买商品 */
            let goodsList = doc.cartList.filter((item) => {
                return item.checked === true;
            });

            let platform = '622';
            let r1 = Math.floor(Math.random() * 10);
            let r2 = Math.floor(Math.random() * 10);
            let now = new Date();
            let sysDate = now.Format('yyyyMMddhhmmss');
            let createdate = now.Format('yyyy-MM-dd hh:mm:ss');
            let orderId = platform + r1 + sysDate + r2;
            let order = {
                orderId: orderId,
                orderTotal,
                addressInfo: address,
                goodsList,
                orderStatus: 1,
                createDate: createdate
            };
            doc.orderList.push(order);
            return doc.save();
        } else {
            return Promise.reject({message: '出错了'});
        }
    })
        .then((doc) => {
            return User.update({userId}, {$pull: {cartList: {checked: true}}});
        })
        .then(() => {
            return userPromise;
        })
        .then((doc) => {
            res.json({
                status: 0,
                msg: 0,
                result: {
                    orderId: doc.orderList.pop().orderId,
                    orderTotal: ''
                }
            });
        })
        .catch((err) => {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        });
});
/* 根据订单Id获取订单信息 */
router.get('/orderDetail', (req, res, next) => {
    let userId = req.cookies.userId;
    let orderId = req.query.orderId;
    User.findOne({userId})
        .then(doc => {
            if (doc) {
                let orderList = doc.orderList;
                let result = {};
                if (orderList.length > 0) {
                    let orderTotal = null;
                    orderList.forEach(item => {
                        if (item.orderId === orderId) {
                            orderTotal = item.orderTotal;
                        }
                    });
                    if (orderTotal != null) {
                        result = {
                            status: 0,
                            msg: '',
                            result: {orderTotal, orderId}
                        };
                    } else {
                        result = {
                            status: 120002,
                            msg: '无此订单',
                            result: ''
                        };
                    }
                } else {
                    result = {
                        status: 120001,
                        msg: '当前用户未创建订单',
                        result: ''
                    };
                }
                res.json(result);
            } else {
                return Promise.reject({message: '出错了；'});
            }
        })
        .catch(err => {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        });
});
module.exports = router;
