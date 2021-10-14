const express = require('express');
const router = express.Router();
const monthService = require("../services/monthServices/monthService");
const validations = require('../services/monthServices/validationsMonth');
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');

router.get('/month', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { month } = req.query;
        const response = await monthService.getMonth(user_id, month);
        console.log("monthService.getMonth Response : " + JSON.stringify(response));
        res.json(response);
    } catch (error) {
        next(error)
    }

});

router.post('/month', validations.validate(validations.createMonthSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { month } = req.body;
        const response = await monthService.setMonth(user_id, month)
        console.log("monthService.setMonth Response : " + JSON.stringify(response));
        res.json(response);
    } catch (error) {
        next(error)
    }

});

router.delete('/month', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const response = await monthService.deleteMonth(user_id, id);
        console.log("monthService.deleteMonth Response: " + JSON.stringify(response));
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = router;