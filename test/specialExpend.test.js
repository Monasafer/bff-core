var expect = require('chai').expect;
var request = require('request');
var randomstring = require("randomstring");
const random = require('random');

let userId = 305;
let name = randomstring.generate(4);
let value = 10000;
let valueUpdated = 12000;
let url = 'http://localhost:3000/'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwNSwiaWF0IjoxNjM0MDUxODQ4LCJleHAiOjE2MzQ2NTY2NDh9.SgH7dgM_D5YPNk1p_kjaoXCfqP7IU00WcAiwGKBLfUw'

it('BFF Create Special Expend', function(done) {
    console.log("TEST SPECIAL EXPEND");
    var options = {
        'method': 'POST',
        'url': url + 'specialExpend',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "capacity": value,
            "month": '2021/10/01'
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedId = res.response.insertId;

        expect(res.response.affectedRows).to.equal(1);
        done();
    });
}).timeout(15000);

it('Bff GET SPECIAL EXPEND', function(done) {
    var options = {
        'method': 'GET',
        'url': url + 'specialExpend?month=2021/10/01',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        expect(res[res.length - 1]).to.deep.include({
            "id": insertedId,
            "name": name,
            "capacity": value,
            "stock": value,
            "user_id": userId,
        });
        done();
    });
}).timeout(15000);


it('BFF Create Special January', function(done) {
    var options = {
        'method': 'POST',
        'url': url + 'specialExpend',
        'headers': {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "capacity": value,
            "month": '2021/01/01'
        })
    };

    request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);

        insertedId = res.response.insertId;

        expect(res.response.affectedRows).to.equal(1);
        done();
    });
}).timeout(15000);


it('Create Special February', function(done) {
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

it('Create Special March', function(done) {
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

// it('BBF Update Special February', function(done) {
//     var options = {
//         'method': 'PUT',
//         'url': url + 'specialExpend?fixed=0&month=2021/02/01&id=' + (insertedId + 10),
//         'headers': {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "name": name + "changed",
//             "capacity": valueUpdated
//         })
//     };

//     request(options, function(error, response) {
//         if (error) throw new Error(error);
//         let res = JSON.parse(response.body);
//         expect(res.error).to.equal(0);
//         done();
//     });
// }).timeout(15000);

// it('Bff GET SPECIAL EXPEND January', function(done) {
//     var options = {
//         'method': 'GET',
//         'url': url + 'specialExpend?month=2021/01/01',
//         'headers': {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//     };

//     request(options, function(error, response) {
//         if (error) throw new Error(error);
//         let res = JSON.parse(response.body);
//         expect(res[res.length - 1]).to.deep.include({
//             "id": insertedId,
//             "user_id": userId,
//             "name": name + "changed",
//             "capacity": value,

//         });
//         done();
//     });
// }).timeout(15000);

// it('Bff GET SPECIAL EXPEND February', function(done) {
//     var options = {
//         'method': 'GET',
//         'url': url + 'specialExpend?month=2021/02/01',
//         'headers': {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//     };

//     request(options, function(error, response) {
//         if (error) throw new Error(error);
//         let res = JSON.parse(response.body);
//         expect(res[res.length - 1]).to.deep.include({
//             "id": (insertedId + 10),
//             "user_id": userId,
//             "name": name + "changed",
//             "capacity": valueUpdated,

//         });
//         done();
//     });
// }).timeout(15000);

// it('Bff GET SPECIAL EXPEND March', function(done) {
//     var options = {
//         'method': 'GET',
//         'url': url + 'specialExpend?month=2021/03/01',
//         'headers': {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//     };

//     request(options, function(error, response) {
//         if (error) throw new Error(error);
//         let res = JSON.parse(response.body);
//         expect(res[res.length - 1]).to.deep.include({
//             "id": insertedId + 20,
//             "user_id": userId,
//             "name": name + "changed",
//             "capacity": valueUpdated,

//         });
//         done();
//     });
// }).timeout(15000);