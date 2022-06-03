const express = require('express');
const saveService = require('../services/saveServices/saveService')
const router = express.Router();
const validations = require('../services/saveServices/validationsSave')
var { error } = 1;
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');


// debe crear un save en la tabla saves y un valor asociado en la tabla saveHistory
router.post('/bff/createSave', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { name, tag, value } = req.body;


        const save = await saveService.createSave(name, user_id, tag); 
        const save_history = await saveService.createSaveHistory(value, user_id, save.insertId); 

        response = { save, save_history }
        console.log("bffSaveRoutes.createSave Response : " + JSON.stringify(response));

        res.json(response);
    } catch (error) {
        next(error)
    }

});

//	debe devolver todos los saves con el ultimo save_history
router.get('/bff/getSaves', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;

        const response = await saveService.getSavesWithLastValueByUserId(user_id); 

        console.log("bffSaveRoutes.getSaves Response : " + JSON.stringify(response));

        res.json(response);
    } catch (error) {
        next(error)
    }

});

//debe devolver todos los saves con todos sus save history
router.get('/bff/getSavesHistory', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;

        const response = await saveService.getSavesHistoryByUserId(user_id); 

        console.log("bffSaveRoutes.bffGetSavesHistory Response : " + JSON.stringify(response));

        res.json(response);
    } catch (error) {
        next(error)
    }

});

//debe devolver todos los saves con todos sus save history
router.post('/bff/updateSave', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { name, value, tag } = req.body;

        const currentSave = await saveService.getSaveWithLastValueById(id, user_id); 

        updateValueResponse = '';
        updateNameAndTagResponse = '';

        if(currentSave.value != value){
            updateValueResponse = await saveService.createSaveHistory(value, user_id, id)
        }
        if(currentSave.name != name || currentSave.tag != tag){
            updateNameAndTagResponse = await saveService.updateSaveById(id, user_id, name, tag)
        }

        response = {updateValueResponse, updateNameAndTagResponse}
        console.log("bffSaveRoutes.updateSave Response : " + JSON.stringify(response));

        res.json(response);
    } catch (error) {
        next(error)
    }

});

module.exports = router;