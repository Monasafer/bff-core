var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
let DateGenerator = require('random-date-generator');
const { getToken } = require('./utils')

let userId = 35;
let name = randomstring.generate(7);
let value = 10000
let url = 'http://localhost:3000/'


it('BFF Create Variable Expend', function(done) {
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
                "month": "2021/10/01",
                "fixed": 0
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);

            insertedId = res.response.insertId;

            expect(res.response.affectedRows).to.equal(1);
            done();
        });
    })

}).timeout(15000);

it('BFF Get Variable Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + `expend?fixed=0&month=2021/10/01&id=null`,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.listVariable[res.listVariable.length - 1]).to.deep.include({
                "id": insertedId,
                "id_fixed_expend": null,
                "name": name,
                "value": value,
                "user_id": userId,
                "state": 1
            });
            done();
        });
    })

}).timeout(15000);


it('BBF Update Variable Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/updateExpend?fixed=0&month=2021/10/01&id=' + insertedId,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": "BFF" + name + "changed",
                "value": 7777,
                "fixed": 0
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.response.affectedRows).to.equal(1);
            expect(res.response.changedRows).to.equal(1);
            done();
        });
    })

}).timeout(15000);

it('BFF Get Variable Expend Updated', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + `expend?fixed=0&month=2021/10/01`,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.listVariable[res.listVariable.length - 1]).to.deep.include({
                "id": insertedId,
                "id_fixed_expend": null,
                "name": "BFF" + name + "changed",
                "value": 7777,
                "user_id": userId,
                "state": 1
            });
            done();
        });
    })

}).timeout(15000);