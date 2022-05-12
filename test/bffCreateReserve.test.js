var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const { getToken } = require('./utils')

let name = randomstring.generate(7);
let value = 10000
let fixed = "1";
let month = '2021/10/01';
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
                "name": name,
                "value": value,
                "month": month,
                "fixed": fixed
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            inserted_fixed_reserve = res.response.insertId;
            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

