const express = require('express');
const expendService = require('../services/expendServices/expendService');
const fixedExpendService = require('../services/fixedExpend/relFixedExpendService');
const monthService = require('../services/monthServices/monthService');
const validations = require('../services/bffExpendServices/validationsBffExpend')
const router = express.Router();

router.post('/bff/createExpend', validations.validate(validations.BffCreateExpend), async (req, res) => {
    const user_id = req.headers['user-id'];
    const { name, value, month, fixed } = req.body;
    //decide the path depending on whether it is fixed or variable
    if (fixed == 1) {
        const responseFixed = await fixedExpendService.setFixedExpend(user_id);
        console.log("FixedExpendService.setFixedExpend Response : " + JSON.stringify(responseFixed)); //Create expense in RelFixedExpend
        id_fe = responseFixed.insertId;       //capture the id inserted in FixedExpend
        const responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe)      //insert to Expend
        console.log("expendService.setExpend Response : " + JSON.stringify(responseExpend));
        response = responseFixed
    }
    else if (fixed == 0) {
        id_fe = null;                                                                             //If the expense is only variable - Create only in Expend 
        const responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe)
        console.log("expendService.setExpend Response : " + JSON.stringify(responseExpend));
        response = responseExpend;
    } else {
        response = { message: 'It must be defined if the value is fixed or variable correctly' }     //passing Fixed other than 0 or 1
    }
    res.json(response);
});

// router.post('/bff/createMonth2', async (req, res) => { //Recorriendo Query varia veces con FOR
//     const user_id = req.headers['user-id'];
//     const month = req.body.month;
//     let response = await monthService.getMonth(user_id, month)
//     if (response[0] == undefined) { //Si no existe el mes
//         response = await monthService.setMonth(user_id, month) //Creo el mes
//         responseGet = await fixedExpendService.getFixedExpendsAndValues(user_id, month);
//         for (i in responseGet) {  //Recorro el get con sus valores
//             id_fe = responseGet[i].id_fe;
//             value = responseGet[i].value;
//             name = responseGet[i].name;
//             responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe)
//         }
//         res.json(responseExpend);
//     } else {
//         res.json(response = { message: "El mes seleccionado ya ha sido creado" })
//     }
// });

router.post('/bff/createMonth', validations.validate(validations.BffCreateMonth), async (req, res) => { //Unique query creating String in for
    const user_id = req.headers['user-id'];
    month = req.body.month;
    const state = 1;
    additional = ""
    let response = await monthService.getMonth(user_id, month)
    if (response[0] == undefined) {//If the month does not exist
        response = await monthService.setMonth(user_id, month) //create the month
        responseGet = await fixedExpendService.getFixedExpendsAndValues(user_id, month);
        month = JSON.stringify(month);
        for (i in responseGet) {  //loop through the get with its values
            id_fe = responseGet[i].id_fe;
            value = responseGet[i].value;
            name = JSON.stringify(responseGet[i].name);
            additional = `(${user_id},${name},${value},${month},${state},${id_fe}),` + additional; //Create String for Query
        }
        additional = additional.substring(0, additional.length - 1);
        responseMultipleExpend = await expendService.setMultipleExpends(additional);
        res.json(response);
    } else {
        res.json(response = { message: "The selected month has already been created" })
    }
});

router.put('/bff/updateExpend', validations.validate(validations.BffUpdateExpend), async (req, res) => {
    const user_id = req.headers['user-id'];
    const { fixed } = req.query;
    const { month } = req.query;
    const { id } = req.query;
    const { name, value } = req.body;
    responseGet = await expendService.getExpend(user_id, month, id, fixed);  //looking for the expense to which I refer
    if (fixed == 0) {                                      // In case of being variable, I perform update as always -reuse service
        const responseUpdateExpend = await expendService.updateExpend(id, user_id, name, value);
        response = responseUpdateExpend;
    }
    else if (fixed == 1) {                                 //In case of being fixed
        id_fe = responseGet[0].id_fe;                      //capture its id_fe to make a query
        fieldName = responseGet[0].name;                   //capture the name, to see if it is what is modified
        fieldValue = responseGet[0].value;                 //capture the value, to see if it is what is modified
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
    }
    else {
        response = { message: 'It must be defined if the value is fixed or variable correctly' }
    }
    console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(response));
    res.json(response);
})

router.delete('/bff/deleteExpend', async (req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const { month } = req.query;
    const { fixed } = req.query;
    responseGet = await expendService.getExpend(user_id, month, id, fixed);  //looking for the expense to which I refer
    id_fe = responseGet[0].id_fe;                      //Capture its id_fe to make a query
    if (fixed == 0) {
        response = await expendService.deleteExpend(id, user_id);
    }
    else if (fixed == 1) {
        responseExpend = await expendService.deleteMultipleExpend(id_fe, user_id, month);
        responseFixed = await fixedExpendService.deleteFixedExpend(user_id, id_fe)
        response = Object.assign(responseExpend, responseFixed);
    }
    console.log("ExpendService.DeleteExpend Response: " + JSON.stringify(response));
    res.json(response);
})

module.exports = router;