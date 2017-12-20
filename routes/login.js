var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log(req.cookies);
    res.render('login', { data: req.cookies });
});

router.post('/', function(req, res, next) {
    var form = req.body;
    // console.log(form);
    request.get(config.getbyop + form.openid, function(err, response, body) {
        var _body = JSON.parse(body);
        if (_body.obj) {
            if (_body.obj.type == 0) {
                _body.obj.type = 'member';
            } else if (_body.obj.type == 1) {
                _body.obj.type = 'leader';
            } else {
                _body.obj.type = 'boss';
            }
            res.cookie('openid', _body.obj.openid);
            res.cookie('name', _body.obj.name);
            res.cookie('staffId', _body.obj.staffId);
            res.cookie('id', _body.obj.id);
            res.cookie('type', _body.obj.type);
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    })
});

router.post('/confirm', function(req, res, next) {
    var form = req.body;
    // console.log(form);
    request.post({ url: config.check, form: form }, function(err, response, body) {
        // console.log(body);
        res.send(body);
    })
});

module.exports = router;