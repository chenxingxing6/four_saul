var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    request.get(config.industry, function(err, response, body) {
        var _body = JSON.parse(body);
        // console.log(_body);
        res.render('industry/industry', { data: _body.obj });
    });
});

router.post('/', function(req, res, next) {
    var info = req.body.info;
    // console.log(info);
    request.get(config.industry, function(err, response, body) {
        var _body = JSON.parse(body);
        var data = [];
        for (var i = 0; i < _body.obj.length; i++) {
            // console.log(info == _body.obj[i].industryName);
            if (info == _body.obj[i].industryName) {
                var item = {
                    industryName: _body.obj[i].industryName,
                    id: _body.obj[i].id,
                    marketState: _body.obj[i].marketState
                }
                data.push(item);
                break;
            }
        }
        res.render('industry/industry', { data: data });
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    request.get(config.industryDetail + id, function(err, response, body) {
        var _body = JSON.parse(body);
        console.log(_body);
        var data = [];
        for (var i = 0; i < _body.obj.length; i++) {
            var item = {
                name: _body.obj[i].name,
                shopId: _body.obj[i].id,
                exsit_service: _body.obj[i].otherBankService,
                address: _body.obj[i].address,
                industry: _body.obj[i].industryName
            }
            data.push(item);
        }
        res.render('industry/industryDetail', { data: data });
    });
});

module.exports = router;