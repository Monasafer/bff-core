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

it('BFF Create Fixed Expend', function(done) {
    console.log("TEST BFF EXPEND");
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
            "dailyUse": notDailyUse
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

it('Bff GET FIXED EXPEND', function(done) {
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

it('BFF Create  NOT Fixed Expend', function(done) {
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
            "dailyUse": notDailyUse
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedId = res.insertId;

        expect(res.affectedRows).to.equal(1);
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
        expect(res.affectedRows).to.equal(1);
        expect(res.changedRows).to.equal(1);
        done();
    });
}).timeout(15000);

it('BFF Create Month', function(done) {
    var options = {
        'method': 'POST',
        'url': url + 'bff/createMonth',
        'headers': {
            'user-id': userId,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "month": month
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedMonthId = res.insertId;

        expect(res.affectedRows).to.equal(1);
        done();
    });
}).timeout(15000);

it('BFF Get Month', function(done) {
    var options = {
        'method': 'GET',
        'url': url + `month?month=${verifyMonth}`,
        'headers': {
            'user-id': userId,
            'Content-Type': 'application/json'
        },
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        expect(res[res.length - 1]).to.deep.include({
            "id": insertedMonthId,
            "user_id": userId,
            "month": verifyMonth + "T03:00:00.000Z",
            "state": 1
        });
        done();
    });
}).timeout(15000);