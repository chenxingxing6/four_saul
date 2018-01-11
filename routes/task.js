var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('task/task', {
        title: 'Express'
    });
});

router.get('/list/boss/:id', function(req, res, next) {
    var id = req.params.id;
    // console.log(id);
    request.get(config.detail + '/' + id, function(err, response, body) {
        // console.log(body);
        var _body = JSON.parse(JSON.parse(body));
        // console.log(_body);
        var data = {
            dutyMonth: {
                shouldComplete: _body.obj.thisMonthNeed,
                completed: _body.obj.thisMonthDone
            },
            lastMonth: {
                shouldComplete: _body.obj.prevMonthNeed,
                completed: _body.obj.prevMonthDone
            },
            leaders: []
        };

        for (var i = 0; i < _body.obj.leaderList.length; i++) {
            // console.log(_body.obj.leaderList[i]);
            var leader = {
                name: _body.obj.leaderList[i].name,
                shouldComplete: _body.obj.leaderList[i].thisMonthNeed,
                completed: _body.obj.leaderList[i].thisMonthDone,
                leaderId: _body.obj.leaderList[i].id
            }
            data.leaders.push(leader);
        }
        res.render('task/list/boss', {
            data: data
        });
    });
});

router.get('/list/leader/:id', function(req, res, next) {
    var id = req.params.id;
    // console.log(id);
    request.get(config.detail + '/' + id, function(err, response, body) {
        console.log(body);
        var _body = JSON.parse(JSON.parse(body));
        // console.log(_body);

        var data = {
            dutyMonth: {
                shouldComplete: _body.obj.groupCount.thisMonthNeed,
                completed: _body.obj.groupCount.thisMonthDone
            },
            lastMonth: {
                shouldComplete: _body.obj.groupCount.prevMonthNeed,
                completed: _body.obj.groupCount.prevMonthDone
            },
            leaderName: _body.obj.name,
            marketArea: _body.obj.location,
            members: []
        };
        for (var i = 0; i < _body.obj.group.length; i++) {
            // console.log(_body.obj.group[i]);
            var member = {
                name: _body.obj.group[i].name,
                shouldComplete: _body.obj.group[i].thisMonthNeed,
                completed: _body.obj.group[i].thisMonthDone,
                memberId: _body.obj.group[i].id
            };
            data.members.push(member);
        }
        res.render('task/list/leader', {
            data: data
        });
    });
});

router.get('/list/member/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    request.get(config.detail + '/' + id, function(err, response, body) {
        // console.log(body);
        var _body = JSON.parse(JSON.parse(body));
        // console.log(_body);

        var data = {
            dutyMonth: {
                shouldComplete: _body.obj.selfCount.thisMonthNeed,
                completed: _body.obj.selfCount.thisMonthDone
            },
            lastMonth: {
                shouldComplete: _body.obj.selfCount.prevMonthNeed,
                completed: _body.obj.selfCount.prevMonthDone
            },
            leaderName: _body.obj.leadername,
            marketArea: _body.obj.location,
            persons: [],
            shops: []
        };
        for (var i = 0; i < _body.obj.tbUser.length; i++) {
            // console.log(_body.obj.tbUser[i]);
            var person = {
                name: _body.obj.tbUser[i].name,
                marketing: _body.obj.tbUser[i].recommondServiceCount,
                marketed: _body.obj.tbUser[i].doneServiceCount,
                personId: _body.obj.tbUser[i].id
            };
            data.persons.push(person);
        }
        for (var i = 0; i < _body.obj.tbShop.length; i++) {
            // console.log(_body.obj.tbShop[i]);
            var shop = {
                name: _body.obj.tbShop[i].name,
                marketing: _body.obj.tbShop[i].recommondServiceCount,
                marketed: _body.obj.tbShop[i].doneServiceCount,
                shopId: _body.obj.tbShop[i].id
            };
            data.shops.push(shop);
        }

        res.render('task/list/member', {
            data: data
        });
    });
});

router.get('/person', function(req, res, next) {
    request.get(config.userService, function(err, response, body) {
        // console.log(body);
        var _body = JSON.parse(body);
        // console.log(_body);
        res.render('task/person/insert', {
            service: _body.obj
        });
    });
});

function fetchUrl(url, callback) {
    request.get(url, function(err, response, body) {
        callback(null, body);
    });
}

var imagePath = 'http://srnswx.huahuayu.com.cn/srnswx/images/';

router.get('/person/update/:id', function(req, res, next) {
    var id = req.params.id;
    var urls = [config.userService, config.userUpdate + id];
    async.mapLimit(urls, 2, function(url, callback) {
        fetchUrl(url, callback);
    }, function(err, results) {
        if (err) throw err;
        var service = JSON.parse(results[0]);
        var update = JSON.parse(results[1]);
        console.log(update);
        var data = {
            person: {
                id: id,
                name: update.obj.people.name,
                tel: update.obj.people.tel,
                card: update.obj.people.card,
                house: update.obj.people.liveSituation,
                address: update.obj.people.address,
                area: update.obj.people.area,
                member: update.obj.people.member,
                income: update.obj.people.income,
                assets: update.obj.people.assets,
                work: update.obj.people.work,
                work_date: update.obj.people.work_date,
                user_detail: update.obj.people.remark,
            },
            service: {
                value: {
                    exsit: update.obj.service.value.exsit.split(','),
                    handle: update.obj.service.value.handle.split(','),
                    intention: update.obj.service.value.intention.split(',')
                },
                string: {
                    exsit: update.obj.service.string.exsit,
                    handle: update.obj.service.string.handle,
                    intention: update.obj.service.string.intention
                }
            },
            record: []
        };
        console.log(data);
        for (var i = 0; i < update.obj.record.length; i++) {
            var item = {
                name: update.obj.record[i].name,
                time: update.obj.record[i].operateTime,
                content: update.obj.record[i].content
            }
            data.record.push(item);
        }
        // console.log(data);
        res.render('task/person/update', {
            service: service.obj,
            data: data
        });
    });

});

router.post('/person', function(req, res, next) {
    console.log(req.body);
    var exsit_service = req.body.exsit_service ? req.body.exsit_service.toString() : '';
    var handle_service = req.body.handle_service ? req.body.handle_service.toString() : '';
    var intention_service = req.body.intention_service ? req.body.intention_service.toString() : '';
    var formData = {
        staffid: req.cookies.id,
        liveSituation: req.body.house,
        remark: req.body.user_detail,
        name: req.body.name,
        phoneNum: req.body.tel,
        idCard: req.body.card,
        area: req.body.area,
        address: req.body.address,
        familyMeberNum: req.body.member,
        annualIncome: req.body.income,
        familyAsset: req.body.assets,
        workUnit: req.body.work,
        workYear: req.body.work_date,
        otherBankService: exsit_service,
        recommendService: handle_service,
        wantService: intention_service
    };
    console.log(formData);
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

router.post('/person/update', function(req, res, next) {
    console.log(req.body);
    var exsit_service = req.body.exsit_service ? req.body.exsit_service.toString() : '';
    var handle_service = req.body.handle_service ? req.body.handle_service.toString() : '';
    var intention_service = req.body.intention_service ? req.body.intention_service.toString() : '';
    var formData = {
        staffid: req.cookies.staffId,
        id: req.body.id,
        liveSituation: req.body.house,
        remark: req.body.user_detail,
        name: req.body.name,
        phoneNum: req.body.tel,
        idCard: req.body.card,
        area: req.body.area,
        address: req.body.address,
        familyMeberNum: req.body.member,
        annualIncome: req.body.income,
        familyAsset: req.body.assets,
        workUnit: req.body.work,
        workYear: req.body.work_date,
        otherBankService: exsit_service,
        recommendService: handle_service,
        wantService: intention_service
    };
    console.log(formData);
    request.post({
        url: config.userUpdate,
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
    var urls = [config.shopService, config.industry];
    async.mapLimit(urls, 2, function(url, callback) {
        fetchUrl(url, callback);
    }, function(err, results) {
        if (err) throw err;
        var service = JSON.parse(results[0]);
        var industry = JSON.parse(results[1]);
        // console.log(service);
        // console.log(industry);
        res.render('task/shop/insert', {
            service: service.obj,
            industry: industry.obj
        });
    });
});

router.get('/shop/update/:id', function(req, res, next) {
    var id = req.params.id;
    var urls = [config.shopService, config.shopUpdate + id, config.industry];
    async.mapLimit(urls, 3, function(url, callback) {
        fetchUrl(url, callback);
    }, function(err, results) {
        if (err) throw err;
        // console.log(results)
        var service = JSON.parse(results[0]);
        var update = JSON.parse(results[1]);
        var industry = JSON.parse(results[2]);
        console.log(update)
        var data = {
            shop: {
                id: id,
                industry: update.obj.people.industryid,
                passportNum: update.obj.people.operateId,
                passport: update.obj.people.operateImg,
                shop_img: update.obj.people.shopStatus,
                shop_detail: update.obj.people.remark,
                shop_name: update.obj.people.shop_name,
                name: update.obj.people.name,
                tel: update.obj.people.tel,
                card: update.obj.people.card,
                shop_address: update.obj.people.shop_address,
                area: update.obj.people.area,
                shop_year: update.obj.people.shop_year,
                shop_state: update.obj.people.shop_state,
                income: update.obj.people.income,
                high_authority: update.obj.people.high_authority,
                person_in_charge: update.obj.people.person_in_charge
            },
            service: {
                value: {
                    exsit: update.obj.service.value.exsit.split(','),
                    handle: update.obj.service.value.handle.split(','),
                    intention: update.obj.service.value.intention.split(',')
                },
                string: {
                    exsit: update.obj.service.string.exsit,
                    handle: update.obj.service.string.handle,
                    intention: update.obj.service.string.intention
                }
            },
            record: []
        };
        for (var i = 0; i < update.obj.record.length; i++) {
            var item = {
                name: update.obj.record[i].name,
                time: update.obj.record[i].operateTime,
                content: update.obj.record[i].content
            }
            data.record.push(item);
        }
        console.log(data);
        res.render('task/shop/update', {
            service: service.obj,
            data: data,
            industry: industry.obj
        });
    });
});

router.post('/shop', function(req, res, next) {
    console.log(req.body);
    var exsit_service = req.body.exsit_service ? req.body.exsit_service.toString() : '';
    var handle_service = req.body.handle_service ? req.body.handle_service.toString() : '';
    var intention_service = req.body.intention_service ? req.body.intention_service.toString() : '';
    var formData = {
        staffid: req.cookies.id,
        location: '',
        industryId: req.body.industry,
        operateId: req.body.passportNum,
        operateImg: req.body.passport,
        shopStatus: req.body.shop_img,
        remark: req.body.shop_detail,
        name: req.body.shop_name,
        owerName: req.body.name,
        phoneNum: req.body.tel,
        idCard: req.body.card,
        address: req.body.shop_address,
        area: req.body.area,
        operateYear: req.body.shop_year,
        operateAddressStatus: req.body.shop_state,
        operateIncome: req.body.income,
        superiorDepartment: req.body.high_authority,
        principal: req.body.person_in_charge,
        otherBankService: exsit_service,
        recommendService: handle_service,
        wantService: intention_service
    };
    console.log(formData);
    request.post({
        url: config.shop,
        form: formData
    }, function(err, response, body) {
        var _body = JSON.parse(body);
        // console.log(_body.msg);
        res.render('task/success', {
            service: _body
        });
    });
});

router.post('/shop/update', function(req, res, next) {
    var exsit_service = req.body.exsit_service ? req.body.exsit_service.toString() : '';
    var handle_service = req.body.handle_service ? req.body.handle_service.toString() : '';
    var intention_service = req.body.intention_service ? req.body.intention_service.toString() : '';
    // console.log(req.body);
    var formData = {
        staffid: req.cookies.staffId,
        id: req.body.id,
        industryId: req.body.industry,
        operateId: req.body.passportNum,
        operateImg: req.body.passport,
        shopStatus: req.body.shop_img,
        remark: req.body.shop_detail,
        name: req.body.shop_name,
        owerName: req.body.name,
        phoneNum: req.body.tel,
        idCard: req.body.card,
        address: req.body.shop_address,
        area: req.body.area,
        operateYear: req.body.shop_year,
        operateAddressStatus: req.body.shop_state,
        operateIncome: req.body.income,
        superiorDepartment: req.body.high_authority,
        principal: req.body.person_in_charge,
        otherBankService: exsit_service,
        recommendService: handle_service,
        wantService: intention_service
    };
    console.log(formData);
    request.post({
        url: config.shopUpdate,
        form: formData
    }, function(err, response, body) {
        var _body = JSON.parse(body);
        // console.log(_body.msg);
        res.render('task/success', {
            service: _body
        });
    });
});

module.exports = router;