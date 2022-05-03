var expect = require('chai').expect;
var request = require('request');
const { getToken } = require('./utils')

let userId = 35
let url = 'http://localhost:3000/'

it('Insert FixedExpend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'relFixedExpend',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        };
        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            id_fixed_expend = res.insertId;
            expect(res.affectedRows).to.equal(1);
            done();
        });
    })

});

it('Get FixedExpend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'relFixedExpend',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res[res.length - 1]).to.deep.include({
                "user_id": userId,
                "state": 1,
                "active": 1,
                "id_fixed_expend": id_fixed_expend
            });
            done();
        });
    })

});

it('Delete FixedExpend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'DELETE',
            'url': url + 'relFixedExpend?id_fixed_expend=' + id_fixed_expend,
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