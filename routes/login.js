var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.cookies);
    res.render('login', { data: req.cookies });
});

router.post('/', function(req, res, next) {
    var form = req.body;
    console.log(form);
    res.redirect('/');
});

module.exports = router;