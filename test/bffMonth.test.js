var expect = require('chai').expect;
var request = require('request');
let DateGenerator = require('random-date-generator');
const { getToken } = require('./utils')
let insertedMonthId;
let month = new Date(DateGenerator.getRandomDate().toDateString()); //TODO : Ver que este month se genere siempre con horario en cero. Que pasa si no mando el horario ?
let url = 'http://localhost:3000/'

it('BFF Create Month', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'POST',
            'url': url + 'bff/createMonth',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "month": month 
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            insertedMonthId = res.insertId;
            expect(res.affectedRows).to.equal(1);
            done();
        });
    })

}).timeout(15000);

it('BFF Get Month', function(done) {
    getToken(function(token) {
        var options = {
            'method': 'GET',
            'url': url + `month?month=${formatDate(month.toISOString())}`,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            lastMonth = res[res.length - 1]
            expect(formatDate(lastMonth.month)).equals(formatDate(month.toISOString()))
            expect(lastMonth).to.deep.include({
                "id": insertedMonthId,
                "state": 1
            });
            done();
        });
    })

}).timeout(15000);

function formatDate(date){
    return date.split('T')[0]; 
}