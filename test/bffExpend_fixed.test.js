var expect = require('chai').expect;
var request = require('request');
const { getToken } = require('./utils')

let name = "firstName";
let value = 10000;
let fixed = "1";
let current_month = '2000/01/01';
let url = 'http://localhost:3000/';

it('BFF Create Fixed Expend', function(done) {
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
                "month": current_month,
                "fixed": fixed
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            inserted_expend_id = res.response.insertId;
            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('BFF Get Fixed Expend for current month', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'bff/getExpenses?month='+current_month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            new_fixed_expend_id = res.fixedExpends[res.fixedExpends.length - 1] //tomo el id del ultimo expend
            expect(new_fixed_expend_id).to.deep.include({
                "name": name,
                "value": value,
                "state": 1
            });
            new_fixed_expend_id = new_fixed_expend_id.id
            done();
        });
    })

}).timeout(15000);

it('BFF Update Fixed Expend without modifications', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/updateExpend?id=' + new_fixed_expend_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": value,
                "month": current_month,
                "fixed": fixed
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.response == "No modifications have been made")
            done();
        });
    })

}).timeout(15000);

it('BFF Update Name of Fixed Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/updateExpend?id=' + new_fixed_expend_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name + "changed",
                "value": value,
                "month": current_month,
                "fixed": fixed
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('BFF Update Value of Fixed Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/updateExpend?id=' + new_fixed_expend_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name + "changed", //changed is the current name
                "value": value + 1,
                "month": current_month,
                "fixed": fixed
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('BFF Update Both Value and Name of Fixed Expend', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/updateExpend?id=' + new_fixed_expend_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name + "changedAgain",
                "value": value + 2,
                "month": current_month,
                "fixed": fixed
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

//TODO: Agregar eliminar expend bff