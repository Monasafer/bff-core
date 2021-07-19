const express = require('express');
const expendService = require('../services/expendServices/expendService');
const fixedExpendService = require('../services/fixedExpend/relFixedExpendService');
const bffExpendService = require('../services/bffExpendServices/bffExpendService');
const router = express.Router();
const validate = require('../services/expendServices/validationsExpend');
const { response } = require('express');

router.post('/bff/createExpend', async (req, res) => {
    const user_id = req.headers['user-id'];
    const { name, value, month, fixed} = req.body;
    //Decido camino dependiendo de si es fijo o variable
    if(fixed==1){
        const responseFixed = await fixedExpendService.setFixedExpend(user_id);
        console.log("FixedExpendService.setFixedExpend Response : " + JSON.stringify(responseFixed)); //Crea gasto en RelFixedExpend
        id_fe = responseFixed.insertId;  //Capturo el id insertado en FixedExpend
        const responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe) //Hago inserción a Expend
        console.log("expendService.setExpend Response : " + JSON.stringify(responseExpend));
        response = Object.assign(responseFixed,responseFixed);
    }
    else if(fixed==0){
        id_fe = null;  //Si el gasto solo es variable - Creo solamente en tabla Expend
        const responseExpend = await expendService.setExpend(user_id, name, value, month, id_fe)
        console.log("expendService.setExpend Response : " + JSON.stringify(responseExpend));
        response = responseExpend
    }else{
       response = {message: 'Debe definirse si el valor es fijo o variable correctamente'} //En caso de pasar Fixed distinto de 0 o 1
    }
    res.json(response);
});

router.put('/bff/updateExpend',async (req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const {name,value} = req.body;
    responseGet = await bffExpendService.getBffExpend(user_id,id);  //Busco el gasto al que hago referencia
    id_fe = responseGet[0].id_fe;  //Capturo su id_fe para ver si es fijo o variable
    if(id_fe == null){  // En caso de ser variable, realizo update como siempre  -reutilizo servicio
        response = await expendService.updateExpend(id, user_id, name, value);
    }
    else if(id_fe != null){}
    else{
        response = {message: 'No se ha podido definir si el valor era fijo o variable'}
    }
    res.json(response);
})

router.delete('/expend', async (req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const response = await expendService.deleteExpend(id, user_id);
    console.log("expendService.DeleteExpend Response: " + JSON.stringify(response));
    res.json(response);
})

module.exports = router;