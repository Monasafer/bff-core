var expect = require('chai').expect;
var request = require('request');
const { getToken } = require('./utils')

let name = "saveName";
let tag = "saveTag";
let value = 500;
let inserted_save_id = 0;

let url = 'http://localhost:3000/';

it('BFF Create Save', function(done) {
    getToken(function(token) {
        var options = {
            'method':'POST',
            'url': url + 'bff/createSave',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "value": value,
                "tag": tag
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            inserted_save_id = res.save.insertId;
            inserted_save_history_id = res.save_history.insertId;
            expect(res.save.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('BFF Get Save', function(done) {
    getToken(function(token) {
        var options = {
            'method':'GET',
            'url': url + 'bff/getSaves',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            lastSave = res[res.length - 1]
            expect(lastSave).to.deep.include({
                "id": inserted_save_id,
                "name": name,
                "value": value,
                "tag": tag
            });
            done();
        });
    })

}).timeout(15000);

it('BFF Get Save History', function(done) {
    getToken(function(token) {
        var options = {
            'method':'GET',
            'url': url + 'bff/getSavesHistory',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            lastSave = res[res.length - 1]
            expect(lastSave).to.deep.include({
                "id": inserted_save_id,
                "name": name,
                "value": value,
                "tag": tag
            });
            done();
        });
    })

}).timeout(15000);

it('BFF Update Save name and value', function(done) {
    getToken(function(token) {
        var options = {
            'method':'POST',
            'url': url + 'bff/updateSave?id=' + inserted_save_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name + "changed",
                "value": value + 1,
                "tag": tag + "changed"
            })
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.updateValueResponse.affectedRows).to.above(0)
            expect(res.updateNameAndTagResponse.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('BFF Get Save Updated', function(done) {
    getToken(function(token) {
        var options = {
            'method':'GET',
            'url': url + 'bff/getSavesHistory',
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            lastSave = res[res.length - 1]
            expect(lastSave).to.deep.include({
                "id": inserted_save_id,
                "name": name + "changed",
                "value": value + 1,
                "tag": tag + "changed"
            });
            done();
        });
    })

}).timeout(15000);

it('BFF Delete Save History', function(done) {
    getToken(function(token) {
        var options = {
            'method':'POST',
            'url': url + 'bff/deleteSaveHistory?id=' + inserted_save_history_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);

it('BFF Delete Save History', function(done) {
    getToken(function(token) {
        var options = {
            'method':'POST',
            'url': url + 'bff/deleteSave?id=' + inserted_save_id,
            'headers': {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };

        request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            expect(res.affectedRows).to.above(0)
            done();
        });
    })

}).timeout(15000);