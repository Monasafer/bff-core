var expect = require('chai').expect;
var request = require('request');
const random = require('random')

let userId = 5
let id_fe = random.int((min = 0), (max = 55000));
let url = 'http://localhost:3000/'

it('Instert FixedExpend', function (done) {
  var options = {
    'method': 'POST',
    'url': url + 'relFixedExpend',
    'headers': {
      'user-id': userId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "id_fe": id_fe
      })
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    let res = JSON.parse(response.body);
    expect(res.affectedRows).to.equal(1);
    done();
  });
});

it('Get FixedExpend', function (done) {
  var options = {
    'method': 'GET',
    'url': url + 'relFixedExpend',
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
        "user_id": userId,
        "state": 1,
        "active": 1,
        "id_fe": id_fe
      });
    done();
  });
});


it('Update FixedExpend', function (done) {
  var options = {
    'method': 'PUT',
    'url': url + 'relFixedExpend?id_fe=' + id_fe,
    'headers': {
      'user-id': userId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "active": 0
      })
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    let res = JSON.parse(response.body);
    expect(res.affectedRows).to.equal(1);
    expect(res.changedRows).to.equal(1);
    done();
  });
});

it('Delete FixedExpend', function (done) {
  var options = {
    'method': 'DELETE',
    'url': url + 'relFixedExpend?id_fe=' + id_fe,
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

