const express = require('express');
const expendService = require('../services/expendServices/expendService');
const relFixedExpendService = require('../services/relFixedExpend/relFixedExpendService');
const monthService = require('../services/monthServices/monthService');
const validations = require('../services/bffExpendServices/validationsBffExpend')
const router = express.Router();
var { error } = 1;
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');


router.post('/bff/createExpend', validations.validate(validations.BffCreateExpend), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const state = 1;
        const { name, value, month, fixed } = req.body;
        let additional = '';
        let id_rel_fixed_expend;

        if (fixed == 1) {
            const responseFixed = await relFixedExpendService.setRelFixedExpend(user_id);
            id_rel_fixed_expend = responseFixed.insertId; //capture the id inserted in FixedExpend
            additional = `(${user_id},"${name}",${value},"${month}",${state},${id_rel_fixed_expend})` + additional;

            const responseMonths = await monthService.getFutureMonths(user_id, month);
            for (i in responseMonths) {
                auxMoth = responseMonths[i].month.toISOString().split("T")[0]
                additional = `(${user_id},"${name}",${value},"${auxMoth}",${state},${id_rel_fixed_expend}),` + additional;
            }
            
            const responseMultipleExpend = await expendService.setMultipleExpends(additional);
            console.log("expendService.setExpend Response : " + JSON.stringify(responseMultipleExpend));
            response = responseMultipleExpend;
            error = 0;
        } else if (fixed == 0) {
            id_rel_fixed_expend = null;
            const responseExpend = await expendService.setExpend(user_id, name, value, month, id_rel_fixed_expend)
            console.log("expendService.setExpend Response : " + JSON.stringify(responseExpend));
            response = responseExpend;
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

router.get('/bff/getExpenses', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { month } = req.query;
        let fixedExpends = [];
        let variableExpends = [];
        const response = await expendService.getExpendByMonth(user_id, month);
        
        results = JSON.parse(JSON.stringify(response));
        results.forEach(element => {
            if (element.id_fixed_expend == null) {
                variableExpends.push(element);
            }
            if (element.id_fixed_expend != null) {
                fixedExpends.push(element);
            }
        });
        res.json({
            fixedExpends,
            variableExpends
        });

    } catch (error) {
        next(error)
    }

});

router.post('/bff/updateExpend', validations.validate(validations.BffUpdateExpend), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { name, value, month, fixed } = req.body;
        if (fixed == 0) { // In case of being variable, I perform update as always -reuse service
            const responseUpdateExpend = await expendService.updateExpend(id, user_id, name, value);
            response = responseUpdateExpend;
            state = 1;
        } else if (fixed == 1) { //In case of being fixed
            currentExpend = await expendService.getExpendById(user_id, id); //looking for the expense to which I refer
            id_rel_fixed_expend = currentExpend[0].id_fixed_expend; //capture its id_rel_fixed_expend to make a query
            fieldName = currentExpend[0].name; //capture the name, to see if it is what is modified
            fieldValue = currentExpend[0].value; //capture the value, to see if it is what is modified
            if (name != fieldName) {
                response = await expendService.updateMultipleExpend(id_rel_fixed_expend, user_id, name, value, month, 0);
            }
            if (value != fieldValue) {
                response = await expendService.updateMultipleExpend(id_rel_fixed_expend, user_id, name, value, month, 1);
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
        console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(response));
        res.json({ error, response });
    } catch (error) {
        next(error);
    }
})

router.post('/bff/payExpend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        responseGet = await expendService.getPayedDataExpend(user_id, id); //looking for the expense to which I refer
        console.log(responseGet)
        let isPayed = responseGet[0].payed
        if (isPayed == 0) {
            isPayed = 1
        } else {
            isPayed = 0
        }
        const responseUpdateExpend = await expendService.updatePayedExpend(id, user_id, isPayed);
        console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(responseUpdateExpend));
        res.json({ error, responseUpdateExpend });
    } catch (error) {
        next(error);
    }
})

router.delete('/bff/deleteExpend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { month } = req.query;
        const { fixed } = req.query;
        currentExpend = await expendService.getExpend(user_id, month, id, fixed); //looking for the expense to which I refer
        id_rel_fixed_expend = currentExpend[0].id_fixed_expend; //Capture its id_rel_fixed_expend to make a query
        if (fixed == 0) {
            response = await expendService.deleteExpend(id, user_id);
        } else if (fixed == 1) { //Borra los proximos fixed expends y desactiva el rel fixed expend asociado.
            responseExpend = await expendService.deleteMultipleExpend(id_rel_fixed_expend, user_id, month);
            responseFixed = await relFixedExpendService.deactivateRelFixedExpend(user_id, id_rel_fixed_expend)
            response = Object.assign(responseExpend, responseFixed);
        }
        console.log("ExpendService.DeleteExpend Response: " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error);
    }

})

module.exports = router;