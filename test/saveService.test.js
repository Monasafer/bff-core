const { assert } = require('chai');
const saveService = require('../src/services/saveServices/saveService');
var randomstring = require("randomstring");
const random = require('random');

let insertedSaveId = 0;
let name = randomstring.generate(50);
let value = random.int(min = 0, max = 100000000)

it('createSave', async function() {
    response = await saveService.createSave(name,35,"inv")
    assert.isTrue(response.affectedRows > 0)
    assert.isTrue(response.insertId > 0)
    insertedSaveId = response.insertId
}).timeout(15000);

it('createSaveHistory', async function() {
    response = await saveService.createSaveHistory(value,insertedSaveId)
    assert.isTrue(response.affectedRows > 0)
    assert.isTrue(response.insertId > 0)
}).timeout(15000);

it('getSaveWithLastValueById', async function() {
    response = await saveService.getSaveWithLastValueById(insertedSaveId, 35)
    assert.isTrue(response[0].name == name)
    assert.isTrue(response[0].value == value)
}).timeout(15000);

it('getSavesWithLastValueByUserId', async function() {
    response = await saveService.getSavesWithLastValueByUserId(35)
    assert.isTrue(response.length > 0)
}).timeout(15000);

it('getSavesHistoryByUserId', async function() {
    response = await saveService.getSavesHistoryByUserId(35)
    assert.isTrue(response.length > 0)
}).timeout(15000);

