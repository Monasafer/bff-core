var expect  = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");


let insertedUserId
let user = randomstring.generate(12);
let pass = randomstring.generate(12);
let new_pass = randomstring.generate(12);
let mail = randomstring.generate(12) + "@gmail.com";
let url = 'http://localhost:3000/';
let creation_date = "2021-07-09T03:00:00.000Z";
let userId = 25;



it('Insert User', function(done) {
  var options = {
      'method': 'POST',
      'url': url + 'user',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "user": user,
          "pass": pass,
          "mail": mail
      })
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body);

      //console.log("body is " + JSON.stringify(res));
      //console.log("affectedRows is " + res.affectedRows);

      insertedUserId = res.insertId;

      expect(res.affectedRows).to.equal(1);
      done();
    });
});


it('Get User', function(done) {
    var options = {
        'method': 'GET',
        'url': url + 'user',
        'headers': {
          'user-id': insertedUserId,
          'pass': pass,
          'Content-Type': 'application/json'
        }  
      };
  
      request(options, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
  
        expect(res[0]).to.deep.include(
          {
          "id": insertedUserId,
          "user": user,
          "pass": pass,
          "mail": mail,
          "creation_date": creation_date,
          "state_code": 1
        });
        done();
      });
  });

  it('Update User', function(done) {
    var options = {
        'method': 'PUT',
        'url': url + 'user',
        'headers': {
          'user-id': insertedUserId,
          'pass': pass,
          'new_pass':new_pass,
          'Content-Type': 'application/json'
        }
      };
  
      request(options, function (error, response) {
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
          'user-id': insertedUserId,
          'pass': new_pass,
          'Content-Type': 'application/json'
        }
      };
  
      request(options, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        expect(res.affectedRows).to.equal(1);
        expect(res.changedRows).to.equal(1);
        done();
      });
  });