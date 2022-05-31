const { assert } = require('chai');
const saveService = require('../src/services/saveServices/saveService');
var randomstring = require("randomstring");
const random = require('random');

let insertedSaveId = 0;
let insertedSaveHistoryId = 0;
let name = randomstring.generate(50);
let value = random.int(min = 0, max = 100000000)

it('createSave', async function() {
    response = await saveService.createSave(name, 35, 'tag')
    assert.isTrue(response.affectedRows > 0)
    assert.isTrue(response.insertId > 0)
    insertedSaveId = response.insertId
}).timeout(15000);

it('createSaveHistory', async function() {
    response = await saveService.createSaveHistory(value, 35, insertedSaveId)
    assert.isTrue(response.affectedRows > 0)
    assert.isTrue(response.insertId > 0)
    insertedSaveHistoryId = response.insertId
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

it('updateSaveById', async function() {
    updateResponse = await saveService.updateSaveById(insertedSaveId, 35, 'changed', 'tag_changed')
    assert.isTrue(updateResponse.affectedRows > 0)

    getResponse = await saveService.getSaveWithLastValueById(insertedSaveId, 35)
    assert.isTrue(getResponse[0].name == 'changed')
    assert.isTrue(getResponse[0].value == value)
}).timeout(15000);

it('deleteSaveHistoryById', async function() {
    deleteResponse = await saveService.deleteSaveHistoryById(35, insertedSaveHistoryId)
    assert.isTrue(deleteResponse.affectedRows > 0)

    getResponse = await saveService.getSaveWithLastValueById(insertedSaveId, 35)
    assert.isTrue(getResponse[0] == undefined)
}).timeout(15000);

it('deleteSaveById', async function() {
    //createSave
    createSaveResponse = await saveService.createSave(name, 35, 'tag')
    assert.isTrue(createSaveResponse.affectedRows > 0)
    assert.isTrue(createSaveResponse.insertId > 0)
    insertedSaveId = createSaveResponse.insertId

    //createSaveHistory
    createSaveHistoryResponse = await saveService.createSaveHistory(value, 35, insertedSaveId)
    assert.isTrue(createSaveHistoryResponse.affectedRows > 0)
    assert.isTrue(createSaveHistoryResponse.insertId > 0)
    insertedSaveHistoryId = createSaveHistoryResponse.insertId

    deleteResponse = await saveService.deleteSaveById(35, insertedSaveId)
    assert.isTrue(deleteResponse.affectedRows > 0)

    getResponse = await saveService.getSaveWithLastValueById(insertedSaveId, 35)
    assert.isTrue(getResponse[0] == undefined)
}).timeout(15000);