const express = require('express');
const saveService = require('../services/saveServices/saveService')
const router = express.Router();
const validations = require('../services/saveServices/validationsSave')
var { error } = 1;

router.get('/save', async(req, res) => {
    const user_id = req.headers['user-id'];
    const { month } = req.query;
    const response = await saveService.getSave(user_id, month);
    console.log("saveService.getSave Response : " + JSON.stringify(response));
    res.json(response);
});

router.post('/save', validations.validate(validations.createSaveSchema), async(req, res) => {
    const user_id = req.headers['user-id'];
    const { name, value, month } = req.body;
    const response = await saveService.setSave(user_id, name, value, month)
    console.log("saveService.setSave Response : " + JSON.stringify(response));
    error = 0;
    res.json({ error, response });
});

router.put('/save', validations.validate(validations.updateSaveSchema), async(req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const { name, value } = req.body;
    const response = await saveService.updateSave(id, user_id, name, value)
    console.log("saveService.updateSave Response : " + JSON.stringify(response));
    error = 0;
    res.json({ error, response });
});

router.delete('/save', async(req, res) => {
    let user_id = req.headers['user-id'];
    const { id } = req.query;
    const response = await saveService.deleteSave(user_id, id)
    console.log("saveService.deleteSave Response : " + JSON.stringify(response));
    error = 0;
    res.json({ error, response });
});

module.exports = router;