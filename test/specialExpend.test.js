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

it('BFF Create Special Expend', function(done) {
    console.log("TEST SPECIAL EXPEND");
    var options = {
        'method': 'POST',
        'url': url + 'specialExpend',
        'headers': {
            'user-id': userId,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "capacity": value,
            "month": '2021/10/01'
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedId = res.response.insertId;

        expect(res.response.affectedRows).to.equal(1);
        done();
    });
}).timeout(15000);

it('Bff GET SPECIAL EXPEND', function(done) {
    var options = {
        'method': 'GET',
        'url': url + 'specialExpend?month=2021/10/01',
        'headers': {
            'user-id': userId,
            'Content-Type': 'application/json'
        },
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        expect(res[res.length - 1]).to.deep.include({
            "id": insertedId,
            "user_id": userId,
        });
        done();
    });
}).timeout(15000);