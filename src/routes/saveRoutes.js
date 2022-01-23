const express = require('express');
const saveService = require('../services/saveServices/saveService')
const router = express.Router();
const validations = require('../services/saveServices/validationsSave')
var { error } = 1;
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');

router.get('/save', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const response = await saveService.getSave(user_id); 
        console.log("saveService.getSave Response : " + JSON.stringify(response));
        res.json(response);
    } catch (error) {
        next(error)
    }

});

router.post('/save', validations.validate(validations.createSaveSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { name, value, month } = req.body;
        const response = await saveService.setSave(user_id, name, value, month)
        console.log("saveService.setSave Response : " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }

});

router.put('/save', validations.validate(validations.updateSaveSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { name, value } = req.body;
        const response = await saveService.updateSave(id, user_id, name, value)
        console.log("saveService.updateSave Response : " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }

});

router.delete('/save', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const response = await saveService.deleteSave(user_id, id)
        console.log("saveService.deleteSave Response : " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }

});

module.exports = router;