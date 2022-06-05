var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const { getToken } = require('./utils')

let insertedMonaId;
let name = randomstring.generate(7);
let value = 1000
let valueUpdated = 1500
let month = "2021-07-31";
let verifymonth = "2021-07-31T03:00:00.000Z";
let url = 'http://localhost:3000/';

it('Insert Mona', (done) => {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'mona',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": value,
                "month": month
            }),
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            insertedMonaId = res.response.insertId;
            expect(res.response.affectedRows).to.equal(1);
            done();
        });
    })
})


it('Get Mona', (done) => {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'mona?month=' + month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res[res.length - 1]).to.deep.include({
                "id": insertedMonaId,
                "name": name,
                "value": value,
                "month": verifymonth,
                "state_code": 1
            });
            done();
        });
    })
});


it('Update Mona', (done) => {
    getToken(function(token) {
        var options = {
            'method': 'PUT',
            'url': url + 'mona?id=' + insertedMonaId,
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
});

it('Get Mona Updated', (done) => {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'mona?month=' + month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };
        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);

            expect(res[res.length - 1]).to.deep.include({
                "id": insertedMonaId,
                "name": name + "changed",
                "value": valueUpdated,
                "month": verifymonth,
                "state_code": 1
            });
            done();
        });
    })
});

it('Delete Mona', (done) => {
    getToken(function(token) {
        var options = {
            'method': 'DELETE',
            'url': url + 'mona?id=' + insertedMonaId,
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
});