const express = require('express');
const reserveService = require('../services/reserveServices/reserveService');
const relFixedReserveService = require('../services/relFixedReserve/relFixedReserveService');
const monthService = require('../services/monthServices/monthService');
const validations = require('../services/bffReserveServices/validationsBffReserve')
const router = express.Router();
var { error } = 1;
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');


router.post('/bff/createReserve', validations.validate(validations.BffCreateReserve), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const state = 1;
        const { name, value, month, fixed } = req.body;
        let additional = '';
        let id_rel_fixed_reserve;
        let futureMonth;

        if (fixed == 1) {
            const responseFixed = await relFixedReserveService.setRelFixedReserve(user_id);
            id_rel_fixed_reserve = responseFixed.insertId; //capture the id inserted in FixedReserve
            const responseMonths = await monthService.getFutureMonths(user_id, month);
            for (i in responseMonths) {
                futureMonth = responseMonths[i].month.getFullYear() + '/' + (responseMonths[i].month.getMonth() + 1) + '/0' + responseMonths[i].month.getDate();
                additional = `(${user_id},"${name}",${value},"${futureMonth}",${state},${id_rel_fixed_reserve}),` + additional;
            }
            additional = additional.substring(0, additional.length - 1);
            const responseMultipleReserve = await reserveService.setMultipleReserves(additional);
            console.log("reserveService.setReserve Response : " + JSON.stringify(responseMultipleReserve));
            response = responseFixed;
            error = 0;
        } else if (fixed == 0) {
            id_rel_fixed_reserve = null;
            const responseReserve = await reserveService.setReserve(user_id, name, value, month, id_rel_fixed_reserve)
            console.log("reserveService.setReserve Response : " + JSON.stringify(responseReserve));
            response = responseReserve;
            error = 0;
        } else {
            response = { message: 'It must be defined if the value is fixed or variable correctly' } 
            error = 0;
        }
        res.json({ error, response });
    } catch (error) {
        next(error)
    }
});

router.post('/bff/updateReserve', validations.validate(validations.BffUpdateReserve), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { name, value, month, fixed } = req.body;
        if (fixed == 0) { // In case of being variable, I perform update as always -reuse service
            const responseUpdateReserve = await reserveService.updateReserve(id, user_id, name, value);
            response = responseUpdateReserve;
            state = 1;
        } else if (fixed == 1) { //In case of being fixed
            currentReserve = await reserveService.getReserveById(user_id, id); //looking for the expense to which I refer
            id_rel_fixed_reserve = currentReserve[0].id_fixed_reserve; //capture its id_rel_fixed_reserve to make a query
            fieldName = currentReserve[0].name; //capture the name, to see if it is what is modified
            fieldValue = currentReserve[0].value; //capture the value, to see if it is what is modified
            if (name != fieldName) {
                response = await reserveService.updateMultipleReserve(id_rel_fixed_reserve, user_id, name, value, month, 0);
            }
            if (value != fieldValue) {
                response = await reserveService.updateMultipleReserve(id_rel_fixed_reserve, user_id, name, value, month, 1);
            }
            if (value == fieldValue && name == fieldName) {
                console.log("No modifications have been made'")
                response = { message: 'No modifications have been made' };
            }
            response = Object.assign(response);
        } else {
            response = { message: 'It must be defined if the value is fixed or variable correctly' }
        }
        error = 0;            
        console.log("ReserveService.UpdateReserve Response: " + JSON.stringify(response));
        res.json({ error, response });
    } catch (error) {
        next(error);
    }
})

router.delete('/bff/deleteReserve', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { month } = req.query;
        const { fixed } = req.query;
        responseGet = await reserveService.getReserve(user_id, month, id, fixed); //looking for the expense to which I refer
        id_rel_fixed_reserve = responseGet[0].id_fixed_reserve; //Capture its id_rel_fixed_reserve to make a query
        if (fixed == 0) {
            response = await reserveService.deleteReserve(id, user_id);
        } else if (fixed == 1) { //Borra los proximos fixed reserves y desactiva el rel fixed reserve asociado.
            responseReserve = await reserveService.deleteMultipleReserve(id_rel_fixed_reserve, user_id, month);
            responseFixed = await relFixedReserveService.deactivateRelFixedReserve(user_id, id_rel_fixed_reserve)
            response = Object.assign(responseReserve, responseFixed);
        }
        console.log("ReserveService.DeleteReserve Response: " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error);
    }

})

module.exports = router;