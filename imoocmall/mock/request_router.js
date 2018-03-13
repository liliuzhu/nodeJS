function setup(app, server) {
    let goodsData = require('../mock/goods');
    let express = require('express');
    let router = express.Router();
    router.get("/goods", function (req, res, next) {
        res.json(goodsData);
    });
    app.use(router);
}

module.exports = setup;
