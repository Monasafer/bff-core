const express = require('express');
const monaService = require('../services/monaServices/monaService')
const router = express.Router();
const validations = require('../services/monaServices/validationsMona')
var { error } = 1;
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');

router.get('/mona', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { month } = req.query;
        const response = await monaService.getMona(user_id, month);
        console.log("monaService.getMona Response : " + JSON.stringify(response));
        res.json(response);
    } catch (error) {
        next(error)
    }

});

router.post('/mona', validations.validate(validations.createMonaSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { name, value, month } = req.body;
        const response = await monaService.setMona(user_id, name, value, month)
        console.log("monaService.setMona Response : " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }

});

router.put('/mona', validations.validate(validations.updateMonaSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { name, value } = req.body;
        const response = await monaService.updateMona(user_id, id, name, value)
        console.log("monaService.updateMona Response : " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }

});

router.delete('/mona', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const response = await monaService.deleteMona(user_id, id)
        console.log("monaService.deleteMona Response : " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }
});

module.exports = router;