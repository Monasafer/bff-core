var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
let DateGenerator = require('random-date-generator');

let insertedMonthId;
let userId = 5
let name = randomstring.generate(7);
let value = 10000
let fixed = "1";
let NoFixed = "0";
let dailyUse = "1";
let notDailyUse = "0";
let month = new Date(DateGenerator.getRandomDate().toDateString());
let verifyMonth = month.toISOString().split('T')[0];
let url = 'http://localhost:3000/'

it('BFF Create Daily Expend', function(done) {
    console.log("TEST DAILY EXPEND");
    var options = {
        'method': 'POST',
        'url': url + 'bff/createExpend',
        'headers': {
            'user-id': userId,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "value": value,
            "month": month,
            "fixed": fixed,
            "dailyUse": dailyUse
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedId_Fe = res.insertId;

        expect(res.affectedRows).to.equal(1);
        done();
    });
}).timeout(15000);

it('Bff GET DAILY-FIXED EXPEND', function(done) {
    var options = {
        'method': 'GET',
        'url': url + 'relFixedExpend',
        'headers': {
            'user-id': userId,
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