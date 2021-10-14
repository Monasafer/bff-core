var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");

let userId = 305
let name = randomstring.generate(7);
let value = 10000
let fixed = "1";
let isDailyUse = "1";
let month = '2021/10/01';
let url = 'http://localhost:3000/'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwNSwiaWF0IjoxNjM0MDUxODQ4LCJleHAiOjE2MzQ2NTY2NDh9.SgH7dgM_D5YPNk1p_kjaoXCfqP7IU00WcAiwGKBLfUw'

it('BFF Create Daily Expend', function(done) {
    console.log("TEST BFF DAILY EXPEND");
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
            "isDailyUse": isDailyUse
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedId_Fe = res.response.insertId;

        expect(res.response.affectedRows).to.equal(1);
        done();
    });
}).timeout(15000);

it('Bff GET DAILY-FIXED EXPEND', function(done) {
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
}).timeout(15000);


it('BFF Get Daily Expend', function(done) {
    var options = {
        'method': 'GET',
        'url': url + `expend?month=2021/10/01`,
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        expect(res.listDaily[res.listDaily.length - 1]).to.deep.include({
            "name": name,
            "value": value,
            "id_fe": insertedId_Fe,
            "user_id": userId,
            "state": 1
        });
        done();
    });
}).timeout(15000);