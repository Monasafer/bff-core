var expect  = require('chai').expect;
var request = require('request');

let insertedExpend;
let userId = '204'
let desc = "Alquiler"
let value = 15000

it('Insert Expend', function(done) {
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3000/expend',
        'headers': {
          'user-id': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "descr": desc,
            "value": value,
            "finish_date":"2021-07-31"
        })
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        console.log("body is " + JSON.stringify(res));

        console.log("affectedRows is " + res.affectedRows);

        insertedExpend = res.insertId;
        console.log("insertId is " + insertedExpend);

        expect(res.affectedRows).to.equal(1);
        done();
      });
});

it('Get Expend', function(done) {
  var options = {
      'method': 'GET',
      'url': 'http://localhost:3000/expend?startDate=2021-06-01&endDate=2022-08-01',
      'headers': {
        'user-id': userId,
        'Content-Type': 'application/json'
      },    
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body);
      console.log("body is " + JSON.stringify(res));

      expect(res).to.deep.include(
        {
        "id": insertedExpend,
        "descr": desc,
        "value": value,
        "user_id": 204,
        "creation_date": "2021-07-01T03:00:00.000Z",
        "finish_date": "2021-07-31T03:00:00.000Z",
        "state_code": 1,
        "payed": 0
      });
      done();
    });
});