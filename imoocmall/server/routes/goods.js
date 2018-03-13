let express = require('express');
let router = express.Router();
let Goods = require('../models/goods');
let User = require('../models/user');
/*
* 获取商品列表
* */
router.get('/list', function (req, res, next) {
    // let list = require('../../mock/mock');
    // for (let i = 0; i < list.length; i++) {
    //     let tem = list[i];
    //     let obj = {
    //         productId: tem.productId,
    //         productName: tem.productName,
    //         salePrice: tem.salePrice,
    //         productImage: tem.productImage
    //     };
    //     // console.log(obj);
    //     new Goods(obj).save();
    // }
    let sort = req.query.sort || 1;
    let page = req.query.page || 1;
    let pageSize = Number.parseInt(req.query.pageSize) || 8;
    let priceLeave = JSON.parse(req.query.priceLeave);
    let skip = (page - 1) * pageSize;
    let params = {};
    if (!priceLeave.string) {
        params.salePrice = {
            $gt: priceLeave.startPrice,
            $lte: priceLeave.endPrice
        };
    }
    Goods.find(params).sort({'salePrice': sort}).skip(skip).limit(pageSize)
        .then((doc) => {
            res.json({
                status: 0,
                msg: '',
                result: doc
            });
        })
        .catch((err) => {
            res.json({
                status: 0,
                msg: err.message
            });
        });
});
/*
* 加入到购物车
* */
router.post("/addCart", function (req, res, next) {
    let userId = req.cookies.userId || new Date().getTime();
    let productId = req.body.productId;

    User.findOne({userId})
        .then((userDoc) => {
            if (userDoc) {
                let goodsItem = '';
                userDoc.cartList.forEach((item) => {
                    if (item.productId === productId) {
                        goodsItem = item;
                        item.productNum++;
                    }
                });
                if (goodsItem) {
                    userDoc.save()
                        .then((doc) => {
                            res.json({
                                status: 0,
                                msg: '',
                                result: 'success'
                            });
                        })
                        .catch((err) => {
                            res.json({
                                status: 1,
                                msg: err.message
                            });
                        });
                } else {
                    Goods.findOne({productId})
                        .then((doc) => {
                            if (doc) {
                                var obj = {productNum: 1, checked: true};
                                Object.assign(doc, obj);
                                userDoc.cartList.push(doc);
                                return userDoc.save();
                            } else {
                                return Promise.reject();
                            }
                        })
                        .then((doc) => {
                            res.json({
                                status: 0,
                                msg: '',
                                result: 'success'
                            });
                        })
                        .catch((err) => {
                            res.json({
                                status: 1,
                                msg: err.message
                            });
                        });
                }
            } else {
                new User({userId, userPwd: '123456', userName: 'tom'}).save()
                    .then((userList) => {
                        res.json({
                            userList,
                            status: 0,
                            msg: '人员创建成功'
                        });
                    })
                    .catch((err) => {
                        res.json({
                            status: 1,
                            msg: '人员创建失败' + err.message
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 1,
                msg: err.message
            });
        });
});

module.exports = router;
