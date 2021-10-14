var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");

let insertedUserId
let user = randomstring.generate(12);
let pass = randomstring.generate(12);
let new_pass = randomstring.generate(12);
let mail = randomstring.generate(12) + "@gmail.com";
let url = 'http://localhost:3000/';


it('Insert User', function(done) {
    console.log("TEST USER");
    var options = {
        'method': 'POST',
        'url': url + 'user',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": user,
            "pass": pass,
            "mail": mail
        })

    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedUserId = res.insertId;

        expect(res.affectedRows).to.equal(1);
        done();
    });
});


it('Login User', function(done) {
    var options = {
        'method': 'POST',
        'url': url + 'login',
        'headers': {
            'user': user,
            'pass': pass,
            'Content-Type': 'application/json'
        }
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        console.log(res);
        token = res.token;
        expect(res).to.deep.include({
            "user": user,
        });
        done();
    });
});


it('Update User', function(done) {
    var options = {
        'method': 'PUT',
        'url': url + 'user',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'user': user,
            'pass': pass,
            'new_pass': new_pass,
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

it('Delete user', function(done) {
    var options = {
        'method': 'DELETE',
        'url': url + 'user',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'user': user,
            'pass': new_pass,
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