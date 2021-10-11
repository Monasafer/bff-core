var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
let DateGenerator = require('random-date-generator');

let insertedMonthId;
let userId = 5
let month = new Date(DateGenerator.getRandomDate().toDateString());
let verifyMonth = month.toISOString().split('T')[0];
let url = 'http://localhost:3000/'


it('BFF Create Month', function(done) {
    console.log("BFF MONTH TEST")
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