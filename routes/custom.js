var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('custom', {
        data: data
    });
});

router.get('/person', function(req, res, next) {
    var data = [{
        name: '小波',
        personId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: '小波',
        personId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: '小波',
        personId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: '小波',
        personId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: '小波',
        personId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }];
    res.render('custom/person', {
        data: data
    });
});

router.post('/person/search', function(req, res, next) {
    var form = req.body;
    console.log(form);
    var data = [{
        name: '小波',
        personId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: '小波',
        personId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }];
    res.render('custom/person', {
        data: data
    });
});

router.get('/shop', function(req, res, next) {
    var data = [{
        name: 'vans专卖店',
        shopId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: 'vans专卖店',
        shopId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: 'vans专卖店',
        shopId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: 'vans专卖店',
        shopId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: 'vans专卖店',
        shopId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }];
    res.render('custom/shop', {
        data: data
    });
});

router.post('/shop/search', function(req, res, next) {
    var form = req.body;
    console.log(form);
    var data = [{
        name: 'vans专卖店',
        shopId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }, {
        name: 'vans专卖店',
        shopId: '12',
        exsit_service: '信用贷，影视贷，保险',
        address: '江西省南昌市经济开发区华东交通大学北区35栋302'
    }];
    res.render('custom/shop', {
        data: data
    });
});

module.exports = router;