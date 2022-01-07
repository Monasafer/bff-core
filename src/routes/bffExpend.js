const express = require('express');
const expendService = require('../services/expendServices/expendService');
const fixedExpendService = require('../services/fixedExpend/relFixedExpendService');
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
        const isSpecial = 0;
        const state = 1;
        const { name, value, month, fixed, isDailyUse } = req.body;
        let additional = '';
        let id_fe;
        let futureMonth;
        //decide the path depending on whether it is fixed or variable
        if (fixed == 1) {
            const responseFixed = await fixedExpendService.setFixedExpend(user_id, isSpecial);
            id_fe = responseFixed.insertId; //capture the id inserted in FixedExpend
            const responseMonths = await monthService.getFutureMonths(user_id, month);
            for (i in responseMonths) {
                futureMonth = responseMonths[i].month.getFullYear() + '/' + (responseMonths[i].month.getMonth() + 1) + '/0' + responseMonths[i].month.getDate();
                additional = `(${user_id},"${name}",${value},"${futureMonth}",${state},${id_fe},${isDailyUse}),` + additional;
            }
            additional = additional.substring(0, additional.length - 1);
            const responseMultipleExpend = await expendService.setMultipleExpends(additional);
            console.log("expendService.setExpend Response : " + JSON.stringify(responseMultipleExpend));
            response = responseFixed;
            error = 0;
        } else if (fixed == 0) {
            id_fe = null; //If the expense is only variable - Create only in Expend 
            const responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe, isDailyUse)
            console.log("expendService.setExpend Response : " + JSON.stringify(responseExpend));
            response = responseExpend;
            error = 0;
        } else {
            response = { message: 'It must be defined if the value is fixed or variable correctly' } //passing Fixed other than 0 or 1
            error = 0;
        }
        res.json({ error, response });
    } catch (error) {
        next(error)
    }
});



router.post('/bff/createMonth', validations.validate(validations.BffCreateMonth), async(req, res, next) => { //Unique query creating String in for
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        month = req.body.month;
        monthSpecial = month;
        const state = 1;
        additional = "";
        additionalSpecial = "";
        let response = await monthService.getMonth(user_id, month)
        if (response[0] == undefined) { //If the month does not exist
            response = await monthService.setMonth(user_id, month) //create the month
            responseGet = await fixedExpendService.getFixedExpendsAndValues(user_id, month);
            if (responseGet[0] != undefined) {
                month = JSON.stringify(month);
                for (i in responseGet) { //loop through the get with its values
                    id_fe = responseGet[i].id_fe;
                    value = responseGet[i].value;
                    name = JSON.stringify(responseGet[i].name);
                    isDailyUse = responseGet[i].isDailyUse;
                    additional = `(${user_id},${name},${value},${month},${state},${id_fe},${isDailyUse}),` + additional; //Create String for Query
                }
                additional = additional.substring(0, additional.length - 1);
                responseMultipleExpend = await expendService.setMultipleExpends(additional);
            }
            responseSpecialGet = await fixedExpendService.getFixedExpendsAndValuesSpecial(user_id, monthSpecial);
            if (responseSpecialGet[0] != undefined) {
                monthSpecial = JSON.stringify(monthSpecial);
                for (i in responseSpecialGet) { //loop through the get with its values
                    id_fe = responseSpecialGet[i].id_fe;
                    capacity = responseSpecialGet[i].capacity;
                    name = JSON.stringify(responseSpecialGet[i].name);
                    additionalSpecial = `(${user_id},${name},${capacity},${capacity},${monthSpecial},${state},${id_fe}),` + additionalSpecial; //Create String for Query
                }
                additionalSpecial = additionalSpecial.substring(0, additionalSpecial.length - 1);
                responseMultipleSpecialExpend = await expendService.setMultipleSpecialExpends(additionalSpecial);
            }
            res.json(response);
        } else {
            res.json(response = { message: "The selected month has already been created" })
        }
    } catch (error) {
        next(error);
    }
});

router.put('/bff/updateExpend', validations.validate(validations.BffUpdateExpend), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { fixed } = req.query;
        const { month } = req.query;
        const { id } = req.query;
        const { name, value, isDailyUse } = req.body;
        responseGet = await expendService.getExpend(user_id, month, id, fixed, isDailyUse); //looking for the expense to which I refer
        if (fixed == 0) { // In case of being variable, I perform update as always -reuse service
            const responseUpdateExpend = await expendService.updateExpend(id, user_id, name, value);
            response = responseUpdateExpend;
            state = 1;
        } else if (fixed == 1) { //In case of being fixed
            id_fe = responseGet[0].id_fe; //capture its id_fe to make a query
            fieldName = responseGet[0].name; //capture the name, to see if it is what is modified
            fieldValue = responseGet[0].value; //capture the value, to see if it is what is modified
            responseValue = {};
            responseName = {};
            if (name != fieldName) {
                console.log("Name is changed");
                additional = 0;
                responseUpdateMultipleExpend = await expendService.updateMultipleExpend(id_fe, user_id, name, value, month, 0);
                console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(responseUpdateMultipleExpend));
                responseName = responseUpdateMultipleExpend;
            }
            if (value != fieldValue) {
                console.log("Value is modified");
                responseUpdateMultipleExpend = await expendService.updateMultipleExpend(id_fe, user_id, name, value, month, 1);
                console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(responseUpdateMultipleExpend));
                responseValue = responseUpdateMultipleExpend;
            }
            response = Object.assign(responseValue, responseName);
            if (value == fieldValue && name == fieldName) {
                response = { message: 'No modifications have been made' };
            }
            error = 0;
        } else {
            response = { message: 'It must be defined if the value is fixed or variable correctly' }
            error = 0;
        }
        console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(response));
        res.json({ error, response });
    } catch (error) {
        next(error);
    }
})

router.put('/bff/payedExpend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        responseGet = await expendService.isPayedExpend(user_id, id); //looking for the expense to which I refer
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
        responseGet = await expendService.getExpend(user_id, month, id, fixed); //looking for the expense to which I refer
        id_fe = responseGet[0].id_fe; //Capture its id_fe to make a query
        if (fixed == 0) {
            response = await expendService.deleteExpend(id, user_id);
        } else if (fixed == 1) {
            responseExpend = await expendService.deleteMultipleExpend(id_fe, user_id, month);
            responseFixed = await fixedExpendService.deleteFixedExpend(user_id, id_fe)
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