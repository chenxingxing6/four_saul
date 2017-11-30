var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('custom', {
        title: 'Express'
    });
});

router.post('/search', function(req, res, next) {
    var form = req.body;
    console.log(form);
    res.render('custom', {
        title: 'Express'
    });
});

module.exports = router;