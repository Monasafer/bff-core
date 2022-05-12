const express = require('express');
const expendService = require('../services/expendServices/expendService');
const reserveService = require('../services/reserveServices/reserveService');
const relFixedReserveService = require('../services/relFixedReserve/relFixedReserveService');
const relFixedExpendService = require('../services/relFixedExpend/relFixedExpendService');
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
        expensesToAdd = "";
        reservesToAdd = "";
        console.log("crear month con datos: " + user_id, req.body.month)
        let response = await monthService.getMonth(user_id, month)
        console.log("crear month response: " + JSON.stringify(response))

        if (response[0] == undefined) { //If the month does not exist
            month_id_created = await monthService.setMonth(user_id, month) //create the month

            //Creation of new fixed expends
            relFixedExpendsWithTheLastExpendNameAndValue = await relFixedExpendService.getRelFixedExpendsWithTheLastExpendNameAndValue(user_id, month);
            if (relFixedExpendsWithTheLastExpendNameAndValue[0] != undefined) {
                month = JSON.stringify(month);
                for (i in relFixedExpendsWithTheLastExpendNameAndValue) { //loop through the get with its values
                    id_rel_fixed_expend = relFixedExpendsWithTheLastExpendNameAndValue[i].id_rel_fixed_expend;
                    value = relFixedExpendsWithTheLastExpendNameAndValue[i].value;
                    name = JSON.stringify(relFixedExpendsWithTheLastExpendNameAndValue[i].name);
                    expensesToAdd = `(${user_id},${name},${value},${month},${state},${id_rel_fixed_expend}),` + expensesToAdd; 
                }
                expensesToAdd = expensesToAdd.substring(0, expensesToAdd.length - 1);
                responseMultipleExpend = await expendService.setMultipleExpends(expensesToAdd);
            }

            //Creation of new fixed reserves
            relFixedReservesWithTheLastReserveNameAndValue = await relFixedReserveService.getRelFixedReservesWithTheLastReserveNameAndValue(user_id, month);
            if (relFixedReservesWithTheLastReserveNameAndValue[0] != undefined) {
                month = JSON.stringify(month);
                for (i in relFixedReservesWithTheLastReserveNameAndValue) { //loop through the get with its values
                    id_rel_fixed_reserve = relFixedReservesWithTheLastReserveNameAndValue[i].id_rel_fixed_reserve;
                    value = relFixedReservesWithTheLastReserveNameAndValue[i].value;
                    name = JSON.stringify(relFixedReservesWithTheLastReserveNameAndValue[i].name);
                    reservesToAdd = `(${user_id},${name},${value},${month},${state},${id_rel_fixed_reserve}),` + reservesToAdd; 
                }
                reservesToAdd = reservesToAdd.substring(0, reservesToAdd.length - 1);
                responseMultipleReserve = await reserveService.setMultipleReserves(reservesToAdd);
            }

            res.json(month_id_created);
        } else {
            res.json(response = { message: "The selected month has already been created" })
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;