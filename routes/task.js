var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('task/task', {
        title: 'Express'
    });
});

router.get('/person', function(req, res, next) {
    request.get(config.userService, function(err, response, body) {
        // console.log(body);
        var _body = JSON.parse(body);
        console.log(_body);
        res.render('task/person', {
            service: _body.obj
        });
    });
});

router.post('/person', function(req, res, next) {
    var exsit_service = req.body.exsit_service.toString();
    var handle_service = req.body.handle_service.toString();
    var intention_service = req.body.intention_service.toString();
    var formData = {
        name: req.body.name,
        phoneNum: req.body.tel,
        idCard: req.body.card,
        familyMeberNum: req.body.member,
        annualIncome: req.body.income,
        familyAsset: req.body.assets,
        workUnit: req.body.work,
        workYear: req.body.work_date,
        otherBankService: exsit_service,
        recommendService: handle_service,
        wantService: intention_service
    };
    // console.log(formData);
    request.post({
        url: config.user,
        form: formData
    }, function(err, response, body) {
        var _body = JSON.parse(body);
        // console.log(_body);
        res.render('task/success', {
            service: _body
        });
    });
});

router.get('/shop', function(req, res, next) {
    request.get(config.shopService, function(err, response, body) {
        var _body = JSON.parse(body);
        // console.log(_body);
        res.render('task/shop', {
            service: _body.obj
        });
    });
});

router.post('/shop', function(req, res, next) {
    var exsit_service = req.body.exsit_service.toString();
    var handle_service = req.body.handle_service.toString();
    var intention_service = req.body.intention_service.toString();
    // console.log(req.body);
    var formData = {
        name: req.body.shop_name,
        owerName: req.body.name,
        phoneNum: req.body.tel,
        idCard: req.body.card,
        address: req.body.shop_address,
        operateYear: req.body.shop_year,
        location: req.body.shop_state,
        operateIncome: req.body.income,
        superiorDepartment: req.body.high_authority,
        principal: req.body.person_in_charge,
        otherBankService: exsit_service,
        recommendService: handle_service,
        wantService: intention_service
    };
    // console.log(formData);
    request.post({
        url: config.shop,
        form: formData
    }, function(err, response, body) {
        var _body = JSON.parse(body);
        console.log(_body.msg);
        res.render('task/success', {
            service: _body
        });
    });
});

module.exports = router;