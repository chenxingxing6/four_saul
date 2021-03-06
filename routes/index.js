var express = require('express');
var router = express.Router();

router.get('/wechat', function(req, res, next) {
  if (req.query.type == 0) {
    var type = 'member';
  } else if (req.query.type == 1) {
    var type = 'leader';
  } else if (req.query.type == 2) {
    var type = 'boss';
  } else {
    var type = '';
  }
  res.cookie('openid', req.query.openid ? req.query.openid : '');
  res.cookie('name', req.query.name ? req.query.name : '');
  res.cookie('staffId', req.query.staffid ? req.query.staffid : '');
  res.cookie('id', req.query.id ? req.query.id : '');
  res.cookie('type', type);
  res.cookie('headPic', req.query.headPic ? req.query.headPic : '');
  console.log('wechat');
  console.log(req.query);
  console.log(req.cookies);
  if (req.query.id) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

router.get('/', function(req, res, next) {
  console.log('login')
  console.log(req.cookies);
  if (!req.cookies.openid) {
    res.redirect('/wechat');
  } else {
    res.render('index', {
      data: req.cookies
    });
  }
});

module.exports = router;