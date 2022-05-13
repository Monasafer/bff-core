var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const { getToken } = require('./utils')

let month = '2022/01/01';
let url = 'http://localhost:3000/'

it('BFF Create Variable Reserve', function(done) {
    let name = randomstring.generate(7);
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/createReserve',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": 400,
                "month": month,
                "fixed": "0"
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            insertedReserveId = res.response.insertId;
            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('Insert ReserveExpend', function(done) {
    let name = randomstring.generate(7);
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'reserveExpend',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": 103,
                "reserve_id": insertedReserveId
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            insertedReserveExpendId = res.response.insertId;
            expect(res.response.affectedRows).to.equal(1);
            done();
        });
    })
}).timeout(15000);

it('Insert Second ReserveExpend', function(done) {
    let name = randomstring.generate(7);
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'reserveExpend',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": 104,
                "reserve_id": insertedReserveId
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            insertedReserveExpendId = res.response.insertId;
            expect(res.response.affectedRows).to.equal(1);
            done();
        });
    })
}).timeout(15000);

it('BFF Get Reserves With Reserve_Expends', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'bff/getReservesWithReserveExpends?month='+month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            console.log(JSON.stringify(res))
            expect(res.reserves.length).to.above(0)
            done();
        });
    })

}).timeout(15000);

