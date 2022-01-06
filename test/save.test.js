var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const { getToken } = require('./utils')
let insertedSaveId;
let userId = 565
let name = randomstring.generate(7);
let value = 1000
let valueUpdated = 1500;
let month = "2021-07-31";
let verifymonth = "2021-07-31T03:00:00.000Z";
let url = 'http://localhost:3000/';


it('Insert Save', function(done) {
    console.log("TEST SAVE");
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'save',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": value,
                "month": month,
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);

            insertedSaveId = res.response.insertId;

            expect(res.response.affectedRows).to.equal(1);
            done();
        });
    })

});

it('Get Save', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'save?month=' + month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);


            expect(res[res.length - 1]).to.deep.include({
                "id": insertedSaveId,
                "name": name,
                "value": value,
                "user_id": userId,
                "month": verifymonth,
                "state_code": 1
            });
            done();
        });
    })

});


it('Update Save', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'PUT',
            'url': url + 'save?id=' + insertedSaveId,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name + " changed",
                "value": valueUpdated
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            console.log
            let res = JSON.parse(response.body);
            expect(res.response.affectedRows).to.equal(1);
            expect(res.response.changedRows).to.equal(1);
            done();
        });
    })

});

it('Get Save Updated', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + 'save?month=' + month,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);

            expect(res[res.length - 1]).to.deep.include({
                "id": insertedSaveId,
                "name": name + " changed",
                "value": valueUpdated,
                "user_id": userId,
                "month": verifymonth,
                "state_code": 1
            });
            done();
        });
    })

});

it('Delete Save', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'DELETE',
            'url': url + 'save?id=' + insertedSaveId,
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