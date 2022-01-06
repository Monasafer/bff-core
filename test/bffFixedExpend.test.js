var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const { getToken } = require('./utils')

let userId = 565;
let name = randomstring.generate(7);
let value = 10000
let fixed = "1";
let notisDailyUse = "0";
let month = '2021/10/01';
let url = 'http://localhost:3000/'


it('BFF Create Fixed Expend', function(done) {
    console.log("TEST BFF FIXED EXPEND");
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/createExpend',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": value,
                "month": month,
                "fixed": fixed,
                "isDailyUse": notisDailyUse
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            insertedId_Fe = res.response.insertId;
            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('Bff GET FIXED EXPEND RELATION', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'relFixedExpend',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res[res.length - 1]).to.deep.include({
                "id_fe": insertedId_Fe,
                "user_id": userId,
                "state": 1,
                "active": 1
            });
            done();
        });
    })

}).timeout(15000);


it('BFF Create Fixed Expend January', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/createExpend',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": value,
                "month": "2021/01/01",
                "fixed": fixed,
                "isDailyUse": notisDailyUse
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            insertedId_Fe = res.response.insertId;
            expect(res.response.affectedRows).to.equal(1);
            done();
        });
    })

}).timeout(15000);


it('Create Fixed February', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/createMonth',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "month": '2021/02/01'
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            done();
        });
    })

}).timeout(15000);

it('Create Fixed March', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/createMonth',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "month": '2021/03/01'
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            done();
        });
    })

}).timeout(15000);