var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const { getToken } = require('./utils')

let userId = 565
let name = randomstring.generate(7);
let value = 10000
let fixed = "1";
let isDailyUse = "1";
let month = '2021/01/01';
let url = 'http://localhost:3000/'
it('BFF Create  Daily Expend', function(done) {
    console.log("TEST BFF DAILY EXPEND");
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
                "isDailyUse": isDailyUse
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            console.log(res)
            insertedId = res.response.insertId;

            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('Bff GET DAILY-FIXED EXPEND', function(done) {
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
                "id_fixed_expend": insertedId,
                "user_id": userId,
                "state": 1,
                "active": 1
            });
            done();
        });
    })

}).timeout(15000);