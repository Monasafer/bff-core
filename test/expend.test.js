var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const random = require('random')

let insertedExpendId;
let userId = 5
let name = randomstring.generate(7);
let value = 10000
let valueUpdated = 15000
let month = "2021-07-31";
let id_fe = random.int((min = 0), (max = 55000));
let verifymonth = "2021-07-31T03:00:00.000Z";
let url = 'http://localhost:3000/'



it('Insert Expend', function (done) {
  console.log("TEST EXPEND");
  var options = {
    'method': 'POST',
    'url': url + 'expend',
    'headers': {
      'user-id': userId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "name": name,
        "value": value,
        "month": month,
        "id_fe": id_fe
      })
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    let res = JSON.parse(response.body);

    insertedExpendId = res.insertId;

    expect(res.affectedRows).to.equal(1);
    done();
  });
}).timeout(15000);

it('Get Expend', function (done) {
  var options = {
    'method': 'GET',
    'url': url + 'expend?month=' + month,
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
        "id": insertedExpendId,
        "name": name,
        "value": value,
        "user_id": userId,
        "month": verifymonth,
        "state": 1,
        "id_fe": id_fe
      });
    done();
  });
}).timeout(15000);


it('Update Expend', function (done) {
  var options = {
    'method': 'PUT',
    'url': url + 'expend?id=' + insertedExpendId,
    'headers': {
      'user-id': userId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "name": name + "changed",
        "value": valueUpdated
      })
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    let res = JSON.parse(response.body);
    expect(res.affectedRows).to.equal(1);
    expect(res.changedRows).to.equal(1);
    done();
  });
}).timeout(15000);

it('Get Expend Updated', function (done) {
  var options = {
    'method': 'GET',
    'url': url + 'expend?month=' + month,
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
        "id": insertedExpendId,
        "name": name + "changed",
        "value": valueUpdated,
        "user_id": userId,
        "month": verifymonth,
        "state": 1
      });
    done();
  });
}).timeout(15000);

it('Delete Expend', function (done) {
  var options = {
    'method': 'DELETE',
    'url': url + 'expend?id=' + insertedExpendId,
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
}).timeout(15000);

