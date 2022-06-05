var expect = require('chai').expect;
var request = require('request');
const { getToken } = require('./utils')

let insertedMonthId;
let month = "2021-07-31";
let verifymonth = "2021-07-31T03:00:00.000Z";
let url = 'http://localhost:3000/'

it('Insert Month', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'month',
            'headers': {
                'Authorization': 'Bearer ' + token,
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
    })

});

it('Get Month', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'month?month=' + month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res[res.length - 1]).to.deep.include({
                "id": insertedMonthId,
                "month": verifymonth,
                "state": 1
            });
            done();
        });
    })

});

it('Delete Month', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'DELETE',
            'url': url + 'month?id=' + insertedMonthId,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.affectedRows).to.equal(1);
            expect(res.changedRows).to.equal(1);
            done();
        });
    })

});