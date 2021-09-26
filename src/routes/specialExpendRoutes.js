const express = require('express');
const specialExpendService = require('../services/specialExpendServices/specialExpendService')
const router = express.Router();
const fixedExpendService = require('../services/fixedExpend/relFixedExpendService');
const validation = require('../services/specialExpendServices/validationSpecialExpend');
let { response } = require('express');
var { error } = 0;

router.get('/specialExpend', async(req, res) => {
    let user_id = req.headers['user-id'];
    const { month } = req.query;
    let response = await specialExpendService.getSpecialExpend(user_id, month, 0);
    console.log("expendService.getSpecialExpend Response : " + JSON.stringify(response));
    res.json(response);
});

router.post('/specialExpend', validation.validate(validation.createSpecialExpendSchema), async(req, res) => {
    const user_id = req.headers['user-id'];
    const { name, capacity, month, } = req.body;
    stock = capacity;
    const isSpecial = 1
    const responseFixed = await fixedExpendService.setFixedExpend(user_id, isSpecial);
    id_fe = responseFixed.insertId;
    const responseSpecialExpend = await specialExpendService.setSpecialExpend(user_id, name, capacity, stock, month, id_fe);
    console.log("expendService.setSpecialExpend Response : " + JSON.stringify(responseSpecialExpend));
    response = responseSpecialExpend;
    error = 0;
    res.json({ error, response });
});

router.put('/specialExpend', async(req, res) => {
    const user_id = req.headers['user-id'];
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
        id_fe = responseGet[0].id_fe; //capture its id_fe to make a query
        fieldName = responseGet[0].name; //capture the name, to see if it is what is modified
        fieldCapacity = responseGet[0].capacity;
        fieldStock = responseGet[0].stock; //capture the value, to see if it is what is modified
        if (name != fieldName) {
            console.log("Name is changed");
            additional = 0;
            responseUpdateMultipleSpecialExpend = await specialExpendService.updateMultipleSpecialExpend(id_fe, user_id, name, capacity, month, 0);
            console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(responseUpdateMultipleSpecialExpend));
            responseName = responseUpdateMultipleSpecialExpend;
        }
        if (capacity != fieldCapacity) {
            console.log("Capacity is modified");
            responseUpdateMultipleSpecialExpend = await specialExpendService.updateMultipleSpecialExpend(id_fe, user_id, name, capacity, month, 1);
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
});


router.delete('/specialExpend', async(req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const { month } = req.query;
    responseGet = await specialExpendService.getSpecialExpend(user_id, month, id); //looking for the expense to which I refer
    id_fe = responseGet[0].id_fe; //Capture its id_fe to make a query
    responseExpend = await specialExpendService.deleteMultipleSpecialExpend(id_fe, user_id, month);
    responseFixed = await fixedExpendService.deleteFixedExpend(user_id, id_fe)
    response = Object.assign(responseExpend, responseFixed);
    console.log("ExpendService.DeleteExpend Response: " + JSON.stringify(response));
    error = 0;
    res.json({ error, response });
})


module.exports = router;