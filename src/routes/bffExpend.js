const express = require('express');
const expendService = require('../services/expendServices/expendService');
const fixedExpendService = require('../services/fixedExpend/relFixedExpendService');
const monthService = require('../services/monthServices/monthService');
const router = express.Router();

router.post('/bff/createExpend', async (req, res) => {
    const user_id = req.headers['user-id'];
    const { name, value, month, fixed } = req.body;
    //Decido camino dependiendo de si es fijo o variable
    if (fixed == 1) {
        const responseFixed = await fixedExpendService.setFixedExpend(user_id);
        console.log("FixedExpendService.setFixedExpend Response : " + JSON.stringify(responseFixed)); //Crea gasto en RelFixedExpend
        id_fe = responseFixed.insertId;       //Capturo el id insertado en FixedExpend
        const responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe)      //Hago inserción a Expend
        console.log("expendService.setExpend Response : " + JSON.stringify(responseExpend));
        response = Object.assign(responseFixed, responseExpend);
    }
    else if (fixed == 0) {
        id_fe = null;                                                                             //Si el gasto solo es variable - Creo solamente en tabla Expend
        const responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe)
        console.log("expendService.setExpend Response : " + JSON.stringify(responseExpend));
        response = responseExpend;
    } else {
        response = { message: 'Debe definirse si el valor es fijo o variable correctamente' }     //En caso de pasar Fixed distinto de 0 o 1
    }
    res.json(response);
});

router.post('/bff/createMonth2', async (req, res) => {
    const user_id = req.headers['user-id'];
    const month = req.body.month;
    let response = await monthService.getMonth(user_id, month)
    if(response[0] == undefined){ //Si no existe el mes
        response = await monthService.setMonth(user_id, month) //Creo el mes
        responseGet = await fixedExpendService.getFixedExpendsAndValues(user_id, month);
        console.log(responseGet.length);
        for(i in responseGet){  //Recorro el get con sus valores
            console.log("vuelta numero " + i);
            id_fe = responseGet[i].id_fe;
            value = responseGet[i].value;
            name = responseGet[i].name;
            responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe)
        }
        res.json(responseExpend);
    }else{
        res.json(response = {message: "El mes seleccionado ya ha sido creado"})
    }
});

router.post('/bff/createMonth', async (req, res) => {
    const user_id = req.headers['user-id'];
    month = req.body.month;
    const state = 1;
    additional = ""
    let response = await monthService.getMonth(user_id, month)
    if(response[0] == undefined){//Si no existe el mes
        response = await monthService.setMonth(user_id, month) //Creo el mes
        responseGet = await fixedExpendService.getFixedExpendsAndValues(user_id, month);
        console.log(responseGet.length);
        month = JSON.stringify(month);
        for(i in responseGet){  //Recorro el get con sus valores
            id_fe = responseGet[i].id_fe;
            value = responseGet[i].value;
            name = JSON.stringify(responseGet[i].name);
            additional = `(${user_id},${name},${value},${month},${state},${id_fe}),` + additional; //Armo cadena de valores para la query
        }
        additional = additional.substring(0, additional.length - 1);
        console.log(additional);
        responseMultipleExpend = await expendService.setMultipleExpends(additional);
        res.json(responseMultipleExpend);
    }else{
        res.json(response = {message: "El mes seleccionado ya ha sido creado"})
    }
});

router.put('/bff/updateExpend', async (req, res) => {
    const user_id = req.headers['user-id'];
    const { fixed } = req.query;
    const { month } = req.query;
    const { id } = req.query;
    const { name, value } = req.body;
    responseGet = await expendService.getExpend(user_id, month, id, fixed);  //Busco el gasto al que hago referencia
    id_fe = responseGet[0].id_fe;                      //Capturo su id_fe para realizar consulta
    fieldName = responseGet[0].name;                   //Capturo el nombre, para ver si es lo que se modifica
    fieldValue = responseGet[0].value;
    responseValue = {};
    responseName = {};
    if (fixed == 0) {                                  // En caso de ser variable, realizo update como siempre  -reutilizo servicio
        const responseUpdateExpend = await expendService.updateExpend(id, user_id, name, value);
        response = responseUpdateExpend;
    }
    else if (fixed == 1) {                             //En caso de ser fijo, veo si cambia el name.
        if (value != fieldValue) {
            console.log("Se modifica valor");
            additional = "AND month > ?";
            const responseUpdateMultipleExpend = await expendService.updateMultipleExpend(id_fe, user_id, name, value, month, additional);
            responseValue = responseUpdateMultipleExpend;
        }
        if (name != fieldName) {
            console.log("Se modifica nombre");
            additional = "";
            const responseUpdateMultipleExpend = await expendService.updateMultipleExpend(id_fe, user_id, name, value, month, additional);
            responseName = responseUpdateMultipleExpend;
        }
        if (value == fieldValue && name == fieldName) {
            response = { message: 'No se han realizado modificaciones' };
        }
        response = Object.assign(responseValue, responseName);
    }
    else {
        response = { message: 'No se ha podido definir si el valor era fijo o variable' }
    }
    res.json(response);
})

router.delete('/bff/deleteExpend', async (req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const { month } = req.query;
    const { fixed } = req.query;
    responseGet = await expendService.getExpend(user_id, month, id, fixed);  //Busco el gasto al que hago referencia
    id_fe = responseGet[0].id_fe;                      //Capturo su id_fe para realizar consulta
    if (fixed == 0) {
        response = await expendService.deleteExpend(id, user_id);
    }
    else if (fixed == 1) {
        responseExpend = await expendService.deleteMultipleExpend(id_fe, user_id, month);
        responseFixed = await fixedExpendService.deleteFixedExpend(user_id, id_fe)
        response = Object.assign(responseExpend, responseFixed);
    }
    res.json(response);
})

module.exports = router;