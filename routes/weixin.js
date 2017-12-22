var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

router.post('/', function(req, res, next) {
    console.log(req.body);
    request.get(config.weixin + '?url=' + req.body.url, function(err, response, body) {
        var _body = JSON.parse(JSON.parse(body));
        console.log(_body);
        res.send(_body);
    })
});

module.exports = router;