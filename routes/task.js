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

router.get('/list/boss', function(req, res, next) {
    var data = {
        dutyMonth: {
            shouldComplete: 3234,
            completed: 3420
        },
        lastMonth: {
            shouldComplete: 4209,
            completed: 3402
        },
        leaders: [{
            name: '张三',
            shouldComplete: 320,
            completed: 340,
            leaderId: 12
        }, {
            name: '李四',
            shouldComplete: 420,
            completed: 410,
            leaderId: 14
        }, {
            name: '王五',
            shouldComplete: 230,
            completed: 340,
            leaderId: 13
        }, {
            name: '小星',
            shouldComplete: 204,
            completed: 194,
            leaderId: 15
        }]

    };
    res.render('task/list/boss', {
        data: data
    });
});

router.get('/list/leader/:id', function(req, res, next) {
    var leaderId = req.params.id;
    console.log(leaderId);
    var data = {
        dutyMonth: {
            shouldComplete: 320,
            completed: 230
        },
        lastMonth: {
            shouldComplete: 330,
            completed: 304
        },
        leaderName: '张三',
        marketArea: '上饶县',
        members: [{
            name: '张三',
            shouldComplete: 32,
            completed: 34,
            memberId: 12
        }, {
            name: '李四',
            shouldComplete: 42,
            completed: 41,
            memberId: 14
        }, {
            name: '王五',
            shouldComplete: 23,
            completed: 34,
            memberId: 13
        }, {
            name: '小星',
            shouldComplete: 24,
            completed: 14,
            memberId: 15
        }]

    };
    res.render('task/list/leader', {
        data: data
    });
});

router.get('/list/member/:id', function(req, res, next) {
    var memberId = req.params.id;
    console.log(memberId);
    var data = {
        dutyMonth: {
            shouldComplete: 32,
            completed: 23
        },
        lastMonth: {
            shouldComplete: 33,
            completed: 30
        },
        leaderName: '张三',
        marketArea: '上饶县',
        persons: [{
            name: '张三',
            marketing: 4,
            marketed: 1,
            personId: 12
        }, {
            name: '李四',
            marketing: 3,
            marketed: 3,
            personId: 14
        }, {
            name: '王五',
            marketing: 3,
            marketed: 2,
            personId: 13
        }, {
            name: '小星',
            marketing: 2,
            marketed: 3,
            personId: 16
        }],
        shops: [{
            name: '张家小店',
            marketing: 3,
            marketed: 3,
            shopId: 14
        }, {
            name: 'vans专卖店',
            marketing: 3,
            marketed: 4,
            shopId: 12
        }, {
            name: '李宁专卖店',
            marketing: 2,
            marketed: 5,
            shopId: 16
        }, {
            name: '霸王车行',
            marketing: 2,
            marketed: 1,
            shopId: 13
        }]

    };
    res.render('task/list/member', {
        data: data
    });
});

router.get('/person', function(req, res, next) {
    request.get(config.userService, function(err, response, body) {
        // console.log(body);
        var _body = JSON.parse(body);
        console.log(_body);
        res.render('task/person/insert', {
            service: _body.obj
        });
    });
});

router.get('/person/update/:id', function(req, res, next) {
    request.get(config.userService, function(err, response, body) {
        // console.log(body);
        var _body = JSON.parse(body);
        console.log(_body);

        var data = {
            person: {
                name: '张三',
                tel: '15745876594',
                card: '360424198402355846',
                address: '南昌市东湖区绿荫大道203号',
                member: '4',
                income: '12',
                assets: '34',
                work: '上饶农商银行',
                work_date: '3'
            },
            service: {
                value: {
                    exsit: [1, 2, 4],
                    handle: [2, 3],
                    intention: [1, 3]
                },
                string: {
                    exsit: ['房贷', '车贷', '人寿保险'],
                    handle: ['车贷', '供房基金'],
                    intention: ['房贷', '供房基金']
                }
            },
            record: [{
                name: '张三',
                time: '2017-12-02 12-24-36',
                content: '修改联系电话，由15985495849变为15789652354'
            }, {
                name: '张三',
                time: '2017-12-02 12-24-36',
                content: '修改联系电话，由15985495849变为15789652354'
            }, {
                name: '张三',
                time: '2017-12-02 12-24-36',
                content: '修改联系电话，由15985495849变为15789652354'
            }, {
                name: '张三',
                time: '2017-12-02 12-24-36',
                content: '修改联系电话，由15985495849变为15789652354'
            }, {
                name: '张三',
                time: '2017-12-02 12-24-36',
                content: '修改联系电话，由15985495849变为15789652354'
            }]
        };

        res.render('task/person/update', {
            service: _body.obj,
            data: data
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

router.get('/shop/update/:id', function(req, res, next) {
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