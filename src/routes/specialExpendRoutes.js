const express = require('express');
const specialExpendService = require('../services/specialExpendServices/specialExpendService')
const router = express.Router();
const fixedExpendService = require('../services/fixedExpend/relFixedExpendService');
const validation = require('../services/specialExpendServices/validationSpecialExpend');
let { response } = require('express');
var { error } = 0;
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');

router.get('/specialExpend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { month } = req.query;
        let response = await specialExpendService.getSpecialExpend(user_id, month, 0);
        console.log("expendService.getSpecialExpend Response : " + JSON.stringify(response));
        res.json(response);
    } catch (error) {
        next(error)
    }

});

router.post('/specialExpend', validation.validate(validation.createSpecialExpendSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { name, capacity, month, } = req.body;
        stock = capacity;
        const isSpecial = 1
        const responseFixed = await fixedExpendService.setFixedExpend(user_id, isSpecial);
        id_fixed_expend = responseFixed.insertId;
        const responseSpecialExpend = await specialExpendService.setSpecialExpend(user_id, name, capacity, stock, month, id_fixed_expend);
        console.log("expendService.setSpecialExpend Response : " + JSON.stringify(responseSpecialExpend));
        response = responseSpecialExpend;
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }

});

router.put('/specialExpend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { month } = req.query;
        const { id } = req.query;
        const { name, capacity, stock } = req.body;
        console.log(user_id, month, id, name, capacity, stock);
        responseGet = await specialExpendService.getSpecialExpend(user_id, month, id);
        console.log(responseGet);
        if (responseGet == []) {
            responseGet = 'not defined';
            console.log(responseGet);
        } else {
            id_fixed_expend = responseGet[0].id_fixed_expend; //capture its id_fixed_expend to make a query
            fieldName = responseGet[0].name; //capture the name, to see if it is what is modified
            fieldCapacity = responseGet[0].capacity;
            fieldStock = responseGet[0].stock; //capture the value, to see if it is what is modified
            if (name != fieldName) {
                console.log("Name is changed");
                additional = 0;
                responseUpdateMultipleSpecialExpend = await specialExpendService.updateMultipleSpecialExpend(id_fixed_expend, user_id, name, capacity, month, 0);
                console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(responseUpdateMultipleSpecialExpend));
                responseName = responseUpdateMultipleSpecialExpend;
            }
            if (capacity != fieldCapacity) {
                console.log("Capacity is modified");
                responseUpdateMultipleSpecialExpend = await specialExpendService.updateMultipleSpecialExpend(id_fixed_expend, user_id, name, capacity, month, 1);
                console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(responseUpdateMultipleSpecialExpend));
                responseValue = responseUpdateMultipleSpecialExpend;
            }
            if (stock != fieldStock && stock != undefined) {
                console.log("Stock is updated");
                responseUpdateStock = await specialExpendService.updateStock(user_id, id, stock, month);
                console.log('UpdateStock response: ' + JSON.stringify(responseUpdateStock));
            }
        }
        error = 0;
        res.json({ error, responseGet });
    } catch (error) {
        next(error)
    }
});


router.delete('/specialExpend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const { month } = req.query;
        responseGet = await specialExpendService.getSpecialExpend(user_id, month, id); //looking for the expense to which I refer
        id_fixed_expend = responseGet[0].id_fixed_expend; //Capture its id_fixed_expend to make a query
        responseExpend = await specialExpendService.deleteMultipleSpecialExpend(id_fixed_expend, user_id, month);
        responseFixed = await fixedExpendService.deleteFixedExpend(user_id, id_fixed_expend)
        response = Object.assign(responseExpend, responseFixed);
        console.log("ExpendService.DeleteExpend Response: " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }

})


module.exports = router;