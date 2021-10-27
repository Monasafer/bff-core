var expect = require('chai').expect;
var request = require('request');
let userId = 155
let url = 'http://localhost:3000/'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1NSwiaWF0IjoxNjM0ODI0NDY0LCJleHAiOjE2MzU0MjkyNjR9.C528U3FcHSW7h9e0NNlKXRyLOyrQktQgdAXI8quq8WI'
it('Insert FixedExpend', function(done) {
    console.log("TEST FIXED EXPEND");
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
        id_fe = res.insertId;
        expect(res.affectedRows).to.equal(1);
        done();
    });
});

it('Get FixedExpend', function(done) {
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
            "id_fe": id_fe
        });
        done();
    });
});

it('Delete FixedExpend', function(done) {
    var options = {
        'method': 'DELETE',
        'url': url + 'relFixedExpend?id_fe=' + id_fe,
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
});