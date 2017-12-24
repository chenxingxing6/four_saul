var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
var iconv = require('iconv-lite');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('custom', {
        data: data
    });
});

router.get('/person/location', function(req, res, next) {
    res.render('custom/location', {});
});

router.post('/person', function(req, res, next) {
    console.log(req.body)
    request.post({ url: config.userLocation, form: { area: req.body.area } }, function(err, response, body) {
        console.log(body)
        var _body = JSON.parse(body);
        console.log(_body);
        var data = [];
        for (var i = 0; i < _body.obj.length; i++) {
            var item = {
                name: _body.obj[i].name,
                personId: _body.obj[i].id,
                exsit_service: _body.obj[i].otherBankService,
                address: _body.obj[i].address
            }
            data.push(item);
        }
        res.render('custom/person', {
            data: data
        });
    })
});

router.post('/person/search', function(req, res, next) {
    var form = req.body;
    // console.log(form);
    request.post({ url: config.userSearch + form.queryCustom, formData: { name: form.queryCustom } }, function(err, response, body) {
        var _body = JSON.parse(body);
        // console.log(_body);
        var data = [];
        for (var i = 0; i < _body.obj.length; i++) {
            var item = {
                name: _body.obj[i].name,
                personId: _body.obj[i].id,
                exsit_service: _body.obj[i].otherBankService,
                address: _body.obj[i].address
            }
            data.push(item);
        }
        res.render('custom/person', {
            data: data
        });
    })
});

router.get('/shop', function(req, res, next) {
    var location = '昌北';
    request.post({ url: config.shopLocation + location, formData: { location: location } }, function(err, response, body) {
        // console.log(body);
        var _body = JSON.parse(body);
        // console.log(_body);
        var data = [];
        for (var i = 0; i < _body.obj.length; i++) {
            var item = {
                name: _body.obj[i].name,
                shopId: _body.obj[i].id,
                exsit_service: _body.obj[i].otherBankService,
                address: _body.obj[i].address
            }
            data.push(item);
        }
        res.render('custom/shop', {
            data: data
        });
    })
});

router.post('/shop/search', function(req, res, next) {
    var form = req.body;
    // console.log(form);
    request.post({ url: config.shopSearch + form.queryCustom, formData: { name: form.queryCustom } }, function(err, response, body) {
        var _body = JSON.parse(body);
        // console.log(_body);
        var data = [];
        for (var i = 0; i < _body.obj.length; i++) {
            var item = {
                name: _body.obj[i].name,
                shopId: _body.obj[i].id,
                exsit_service: _body.obj[i].otherBankService,
                address: _body.obj[i].address
            }
            data.push(item);
        }
        res.render('custom/shop', {
            data: data
        });
    })
});

module.exports = router;