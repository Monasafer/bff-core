var expect = require('chai').expect;
var request = require('request');
const { getToken } = require('./utils')

let name = "firstName";
let value = 10000;
let fixed = "0";
let month = '2004/01/01';
let url = 'http://localhost:3000/';

it('BFF Create Variable Reserve', function(done) {
    getToken(function(token) {
        var options = {
            'method':'POST',
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
            inserted_reserve_id = res.response.insertId;
            expect(res.response.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('BFF Get Reserves With Reserve_Expends for current month', function(done) {
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
            new_fixed_reserve_id = res.reserves[res.reserves.length - 1].reserve.id //tomo el id del ultimo expend
            expect(res.reserves.length).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('BFF Update Variable Reserve without modifications', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/updateReserve?id=' + new_fixed_reserve_id,
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
            expect(res.response == "No modifications have been made")
            done();
        });
    })

}).timeout(15000);

it('BFF Update Name Variable Reserve', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/updateReserve?id=' + new_fixed_reserve_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name + "changed",
                "value": value,
                "month": month,
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

it('BFF Update Value Variable Reserve', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/updateReserve?id=' + new_fixed_reserve_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name + "changed", //this is already changed, so, i am not changing it now
                "value": value + 2,
                "month": month,
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

it('BFF Get Reserves With Reserve_Expends for current month Updateds', function(done) {
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
            expect(res.reserves.length).to.above(0)
            done();
        });
    })

}).timeout(15000);