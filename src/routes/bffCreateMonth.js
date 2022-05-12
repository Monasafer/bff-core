const express = require('express');
const expendService = require('../services/expendServices/expendService');
const fixedExpendService = require('../services/fixedExpend/relFixedExpendService');
const monthService = require('../services/monthServices/monthService');
const validations = require('../services/monthServices/validationsMonth')
const router = express.Router();
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');

router.post('/bff/createMonth', validations.validate(validations.createMonthSchema), async(req, res, next) => { 
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        month = req.body.month;
        const state = 1;
        additional = "";
        let response = await monthService.getMonth(user_id, month)
        if (response[0] == undefined) { //If the month does not exist
            response = await monthService.setMonth(user_id, month) //create the month
            responseGet = await fixedExpendService.getFixedExpendsAndValues(user_id, month);
            if (responseGet[0] != undefined) {
                month = JSON.stringify(month);
                for (i in responseGet) { //loop through the get with its values
                    id_fixed_expend = responseGet[i].id_fixed_expend;
                    value = responseGet[i].value;
                    name = JSON.stringify(responseGet[i].name);
                    additional = `(${user_id},${name},${value},${month},${state},${id_fixed_expend}),` + additional; 
                }
                additional = additional.substring(0, additional.length - 1);
                responseMultipleExpend = await expendService.setMultipleExpends(additional);
            }
            res.json(response);
        } else {
            res.json(response = { message: "The selected month has already been created" })
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;