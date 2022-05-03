var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const random = require('random');
const { getToken } = require('./utils')

let insertedExpendId;
let userId = 565
let name = randomstring.generate(7);
let value = 10000
let valueUpdated = 15000
let month = "2021-07-31";
let verifymonth = "2021-07-31T03:00:00.000Z";
let url = 'http://localhost:3000/'

it('Insert Variable Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'expend',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": value,
                "month": month,
                "id_fixed_expend": null
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);

            insertedExpendId = res.response.insertId;

            expect(res.response.affectedRows).to.equal(1);
            done();
        });
    })
}).timeout(15000);


it('Get Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'expend?month=' + month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.listFixed[res.listFixed.length - 1]).to.deep.include({
                "id": insertedExpendId,
                "name": name,
                "value": value,
                "user_id": userId,
                "month": verifymonth,
                "state": 1
            });
            done();
        })

    });
}).timeout(15000);


it('Update Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'PUT',
            'url': url + 'expend?id=' + insertedExpendId,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name + "changed",
                "value": valueUpdated
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

it('Get Expend Updated', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'expend?month=' + month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);

            expect(res.listFixed[res.listFixed.length - 1]).to.deep.include({
                "id": insertedExpendId,
                "name": name + "changed",
                "value": valueUpdated,
                "user_id": userId,
                "month": verifymonth,
                "state": 1
            });
            done();
        });
    })

}).timeout(15000);

it('Delete Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'DELETE',
            'url': url + 'expend?id=' + insertedExpendId,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
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