var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const { getToken } = require('./utils')

let insertedReserveId;
let userId = 35 //User ID del usuario que se usa para generar token : prueba prueba
let name = randomstring.generate(7);
let value = 10000
let valueUpdated = 15000
let url = 'http://localhost:3000/'

it('BFF Create Fixed Reserve', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/createReserve',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": randomstring.generate(7),
                "value": 400,
                "month": '2002/01/01',
                "fixed": "1"
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
                "value": value,
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


it('Get ReserveExpend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'reserveExpend?reserve_id=' + insertedReserveId,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            
            expect(res.response[0]).to.deep.include({
                "id": insertedReserveExpendId,
                "name": name,
                "value": value,
                "user_id": userId,
                "reserve_id": insertedReserveId,
                "state": 1
            });
            done();
        })

    });
}).timeout(15000);


it('Update ReserveExpend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'PUT',
            'url': url + 'reserveExpend?id=' + insertedReserveExpendId,
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

it('Get ReserveExpend Updated', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'reserveExpend?reserve_id=' + insertedReserveId,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);

            expect(res.response[0]).to.deep.include({
                "id": insertedReserveExpendId,
                "name": name + "changed",
                "value": valueUpdated,
                "user_id": userId,
                "reserve_id": insertedReserveId,
                "state": 1
            });
            done();
        });
    })

}).timeout(15000);

it('Delete ReserveExpend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'DELETE',
            'url': url + 'reserveExpend?id=' + insertedReserveExpendId,
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