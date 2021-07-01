var expect  = require('chai').expect;
var request = require('request');

it('Insert Mona', function(done) {

    var options = {
        'method': 'POST',
        'url': 'http://localhost:3000/expend',
        'headers': {
          'user-id': '204',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"descr":"Alquiler","value":"20000","finish_date":"2021-07-31"})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        console.log("body is " + JSON.stringify(res));
        //until here, always same.

        console.log("affectedRows is " + res.affectedRows);
        expect(res.affectedRows).to.equal(1);
        done();
      });
});