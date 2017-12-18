var express = require('express');
var router = express.Router();

router.get('/wechat', function(req, res, next) {
    res.cookie('openid', req.query.openid);
    res.cookie('name', req.query.name);
    res.cookie('staffId', req.query.staffId);
    res.cookie('id', req.query.id);
    res.cookie('type', req.query.type);
    res.cookie('headPic', req.query.headPic);
    // console.log(req.query);
    if(req.query.id){
    	res.redirect('/');
    }else{
    	res.redirect('/login');
    }
});

router.get('/', function(req, res, next) {
    // console.log(req.cookies);
    if(!req.cookies.openid){
    	res.redirect('/wechat');
    }else{
    	res.render('index', { data: req.cookies });
    }
});

module.exports = router;