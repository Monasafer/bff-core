const express = require('express');
const reserveExpendService = require('../services/reserveExpendServices/reserveExpendService');
const validations = require('../services/reserveExpendServices/validationsReserveExpend')
const router = express.Router();
var { error } = 1;
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');

router.get('/reserveExpend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { reserve_id } = req.query;
        const response = await reserveExpendService.getReserveExpendByReserve(user_id, reserve_id);
        console.log("reserveExpendService.getReserveExpend Response : " + JSON.stringify(response));
        res.json({ error, response });

    } catch (error) {
        next(error)
    }
});

router.post('/reserveExpend', validations.validate(validations.createReserveExpendSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { name, value, reserve_id } = req.body;

        const responseReserveExpend = await reserveExpendService.setReserveExpend(user_id, name, value, reserve_id)
        console.log("reserveExpendService.setReserveExpend Response : " + JSON.stringify(responseReserveExpend));
        response = responseReserveExpend;
        error = 0;

        res.json({ error, response });
    } catch (error) {
        next(error)
    }
});

router.put('/reserveExpend', validations.validate(validations.updateReserveExpendSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { name, value } = req.body;

        const responseUpdateReserveExpend = await reserveExpendService.updateReserveExpend(id, user_id, name, value);
        response = responseUpdateReserveExpend;
        state = 1;

        console.log("reserveExpendService.updateReserveExpend Response: " + JSON.stringify(response));
        res.json({ error, response });
    } catch (error) {
        next(error);
    }
})

router.delete('/reserveExpend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;

        response = await reserveExpendService.deleteReserveExpend(id, user_id);
        console.log("reserveExpendService.deleteReserveExpend Response: " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error);
    }

})

module.exports = router;