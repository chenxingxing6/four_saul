var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('task/task', { title: 'Express' });
});

router.get('/person', function(req, res, next) {
    request.get(config.service, function(err, response, body) {
        var _body = JSON.parse(body);
        console.log(_body);
        res.render('task/person', { service: _body.obj });
    });
});

router.post('/person', function(req, res, next) {
    var formData = {
        name: req.body.name,
        phoneNum: req.body.tel,
        idCard: req.body.card,
        familyMeberNum: req.body.member,
        annualIncome: req.body.income,
        familyAsset: req.body.assets,
        workUnit: req.body.work,
        workYear: req.body.work_date,
        otherBankService: req.body.exsit_service,
        recommendService: req.body.handle_service,
        wantService: req.body.intention_service
    };
    // console.log(formData);
    request.post({ url: config.user, form: formData }, function(err, response, body) {
        var _body = JSON.parse(body);
        console.log(_body.msg);
        res.render('task/success', { service: _body });
    });
});

router.get('/shop', function(req, res, next) {
    res.render('task/shop', { service: "" });
});

module.exports = router;