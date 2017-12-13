var express = require('express');
var router = express.Router();

router.get('/wechat', function(req, res, next) {
    var openid = 'asd12312a131f354';
    var wxImg = '12321.jpg';
    res.cookie('openid', openid);
    res.cookie('wxImg', wxImg);
    res.redirect('/login');
});

router.get('/', function(req, res, next) {
    // var id = req.params.id;
    // console.log(id);
    res.render('index', { title: 'Express' });
});

module.exports = router;