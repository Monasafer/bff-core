var expect  = require('chai').expect;
var request = require('request');

let insertedExpendId;
let userId = '204'
let desc = "Zapatillas"
let value = 15000
let month = "2021-07"
let url = 'http://localhost:3000/'

it('Insert Expend', function(done) {
    var options = {
        'method': 'POST',
        'url': url + 'expend',
        'headers': {
          'user-id': userId,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "descr": desc,
            "value": value,
            "month": month,
            "recurrent": 0
        })
      };

      request(options, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        console.log("body is " + JSON.stringify(res));
        console.log("affectedRows is " + res.affectedRows);

        insertedExpendId = res.insertId;
        //console.log("insertId is " + insertedExpend);

        expect(res.affectedRows).to.equal(1);
        done();
      });
});

it('Get Expend', function(done) {
  var options = {
      'method': 'GET',
      'url': url + 'expend?startDate=2021-06-01&endDate=2022-08-01',
      'headers': {
        'user-id': userId,
        'Content-Type': 'application/json'
      },    
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body);

      expect(res).to.deep.include(
        {
        "id": insertedExpendId,
        "descr": desc,
        "value": value,
        "user_id": 204,
        "creation_date": "2021-07-01T03:00:00.000Z",
        "month": "2021-07",
        "recurrent" : 0,
        "state_code": 1,
        "payed": 0
      });
      done();
    });
});
