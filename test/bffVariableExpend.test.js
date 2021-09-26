var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
let DateGenerator = require('random-date-generator');

let userId = 5
let name = randomstring.generate(7);
let value = 10000
let fixed = "1";
let NoFixed = "0";
let isDailyUse = "1";
let notisDailyUse = "0";
let month = new Date(DateGenerator.getRandomDate().toDateString());
let verifyMonth = month.toISOString().split('T')[0];
let url = 'http://localhost:3000/'


it('BFF Create  Variable Expend', function(done) {
    console.log("TEST BFF VARIABLE EXPEND");
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
            "month": "2021/10/01",
            "fixed": NoFixed,
            "isDailyUse": notisDailyUse
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

it('BFF Get No-Fixed Expend', function(done) {
    var options = {
        'method': 'GET',
        'url': url + `expend?fixed=0&month=2021/10/01&id=null`,
        'headers': {
            'user-id': userId,
            'Content-Type': 'application/json'
        },
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        //console.log(res.listVariable[0]);
        expect(res.listVariable[res.listVariable.length - 1]).to.deep.include({
            "id": insertedId,
            "id_fe": null,
            "name": name,
            "value": value,
            "user_id": userId,
            "state": 1
        });
        done();
    });
}).timeout(15000);


it('BBF Update No-Fixed Expend', function(done) {
    var options = {
        'method': 'PUT',
        'url': url + 'bff/updateExpend?fixed=0&month=2021/10/01&id=' + insertedId,
        'headers': {
            'user-id': userId,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": "BFF" + name + "changed",
            "value": 7777
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        expect(res.response.affectedRows).to.equal(1);
        expect(res.response.changedRows).to.equal(1);
        done();
    });
}).timeout(15000);

it('BFF Get No-Fixed Expend Updated', function(done) {
    var options = {
        'method': 'GET',
        'url': url + `expend?fixed=0&month=2021/10/01&id=null`,
        'headers': {
            'user-id': userId,
            'Content-Type': 'application/json'
        },
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        //console.log(res.listVariable[0]);
        expect(res.listVariable[res.listVariable.length - 1]).to.deep.include({
            "id": insertedId,
            "id_fe": null,
            "name": "BFF" + name + "changed",
            "value": 7777,
            "user_id": userId,
            "state": 1
        });
        done();
    });
}).timeout(15000);