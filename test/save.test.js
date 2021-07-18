var expect  = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");

let insertedSaveId;
let userId = 5
let name = randomstring.generate(7);
let value = 1000
let valueUpdated = 1500;
let month = "2021-07-31";
let verifymonth = "2021-07-31T03:00:00.000Z";
let url = 'http://localhost:3000/';


it('Insert Save', function(done) {
    var options = {
        'method': 'POST',
        'url': url + 'save',
        'headers': {
          'user-id': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "name": name,
            "value": value,
            "month": month,
        })
      };

      request(options, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedSaveId = res.insertId;

        expect(res.affectedRows).to.equal(1);
        done();
      });
});

it('Get Save', function(done) {
  var options =  {
      'method': 'GET',
      'url': url + 'save?month=' + month,
      'headers': {
        'user-id': userId,
        'Content-Type': 'application/json'
      },    
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      let res =  JSON.parse(response.body);


       expect(res[res.length - 1]).to.deep.include(
        {
        "id": insertedSaveId,
        "name": name,
        "value": value,
        "user_id": userId,
        "month": verifymonth,
        "state_code": 1
      });
      done();
    });
});


it('Update Save', function(done) {
  var options = {
      'method': 'PUT',
      'url': url + 'save?id=' + insertedSaveId,
      'headers': {
        'user-id': userId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "name": name + " changed",
          "value": valueUpdated
      })
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log
      let res = JSON.parse(response.body);
      expect(res.affectedRows).to.equal(1);
      expect(res.changedRows).to.equal(1);
      done();
    });
});

it('Get Save Updated', function(done) {
  var options = {
      'method': 'GET',
      'url': url + 'save?month=' + month,
      'headers': {
        'user-id': userId,
        'Content-Type': 'application/json'
      },    
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body);

      expect(res[res.length - 1]).to.deep.include(
        {
        "id": insertedSaveId,
        "name": name + " changed",
        "value": valueUpdated,
        "user_id": userId,
        "month": verifymonth,
        "state_code": 1
      });
      done();
    });
});

it('Delete Save', function(done) {
  var options = {
      'method': 'DELETE',
      'url': url + 'save?id=' + insertedSaveId,
      'headers': {
        'user-id': userId,
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

