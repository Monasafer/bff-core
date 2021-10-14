var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
let DateGenerator = require('random-date-generator');
const random = require('random');

let userId = 305;
let name = randomstring.generate(7);
let value = 10000
let fixed = "1";
let NoFixed = "0";
let isDailyUse = "1";
let notisDailyUse = "0";
let month = '2021/10/01';
let url = 'http://localhost:3000/'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwNSwiaWF0IjoxNjM0MDUxODQ4LCJleHAiOjE2MzQ2NTY2NDh9.SgH7dgM_D5YPNk1p_kjaoXCfqP7IU00WcAiwGKBLfUw'

it('BFF Create Fixed Expend', function(done) {
    console.log("TEST BFF FIXED EXPEND");
    var options = {
        'method': 'POST',
        'url': url + 'bff/createExpend',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "value": value,
            "month": month,
            "fixed": fixed,
            "isDailyUse": notisDailyUse
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        insertedId_Fe = res.response.insertId;
        expect(res.response.affectedRows).to.equal(1);
        done();
    });
}).timeout(15000);

it('Bff GET FIXED EXPEND RELATION', function(done) {
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
            "id_fe": insertedId_Fe,
            "user_id": userId,
            "state": 1,
            "active": 1
        });
        done();
    });
}).timeout(15000);

it('BFF Get Fixed Expend Values', function(done) {
    var options = {
        'method': 'GET',
        'url': url + `expend?month=2021/10/01`,
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        //console.log(res.listVariable[0]);
        inserted_iD = res.listFixed[res.listFixed.length - 1].id;
        expect(res.listFixed[res.listFixed.length - 1]).to.deep.include({
            "id_fe": insertedId_Fe,
            "name": name,
            "value": value,
            "user_id": userId,
        });
        done();
    });
}).timeout(15000);


it('BFF Create Fixed Expend January', function(done) {
    var options = {
        'method': 'POST',
        'url': url + 'bff/createExpend',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "value": value,
            "month": "2021/01/01",
            "fixed": fixed,
            "isDailyUse": notisDailyUse
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        insertedId_Fe = res.response.insertId;
        expect(res.response.affectedRows).to.equal(1);
        done();
    });
}).timeout(15000);


it('Create Fixed February', function(done) {
    var options = {
        'method': 'POST',
        'url': url + 'bff/createMonth',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "month": '2021/02/01'
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        done();
    });
}).timeout(15000);

it('Create Fixed March', function(done) {
    var options = {
        'method': 'POST',
        'url': url + 'bff/createMonth',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "month": '2021/03/01'
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        done();
    });
}).timeout(15000);

// it('BBF Update Fixed February', function(done) {
//     var options = {
//         'method': 'PUT',
//         'url': url + 'bff/updateExpend?fixed=1&month=2021/02/01&id=' + (inserted_iD + 20),
//         'headers': {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "name": name + "changed",
//             "value": "7000",
//             'isDailyUse ': 0
//         })
//     };

//     request(options, function(error, response) {
//         if (error) throw new Error(error);
//         let res = JSON.parse(response.body);
//         expect(res.error).to.equal(0);
//         done();
//     });
// }).timeout(15000);

// it('BFF Get Fixed Expend January', function(done) {
//     var options = {
//         'method': 'GET',
//         'url': url + `expend?month=2021/01/01`,
//         'headers': {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//     };

//     request(options, function(error, response) {
//         if (error) throw new Error(error);
//         let res = JSON.parse(response.body);
//         //console.log(res.listVariable[0]);
//         inserted_iD = res.listFixed[res.listFixed.length - 1].id;
//         expect(res.listFixed[res.listFixed.length - 1]).to.deep.include({
//             "id_fe": insertedId_Fe,
//             "name": name + "changed",
//             "value": value,
//             "user_id": userId,
//         });
//         done();
//     });
// }).timeout(15000);

// it('BFF Get Fixed Expend February', function(done) {
//     var options = {
//         'method': 'GET',
//         'url': url + `expend?month=2021/02/01`,
//         'headers': {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//     };

//     request(options, function(error, response) {
//         if (error) throw new Error(error);
//         let res = JSON.parse(response.body);
//         //console.log(res.listVariable[0]);
//         expect(res.listFixed[res.listFixed.length - 1]).to.deep.include({
//             "id_fe": insertedId_Fe,
//             "name": name + "changed",
//             "value": 7000,
//             "user_id": userId,
//         });
//         done();
//     });
// }).timeout(15000);

// it('BFF Get Fixed Expend February', function(done) {
//     var options = {
//         'method': 'GET',
//         'url': url + `expend?month=2021/03/01`,
//         'headers': {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//     };

//     request(options, function(error, response) {
//         if (error) throw new Error(error);
//         let res = JSON.parse(response.body);
//         //console.log(res.listVariable[0]);
//         expect(res.listFixed[res.listFixed.length - 1]).to.deep.include({
//             "id_fe": insertedId_Fe,
//             "name": name + "changed",
//             "value": 7000,
//             "user_id": userId,
//         });
//         done();
//     });
// }).timeout(15000);