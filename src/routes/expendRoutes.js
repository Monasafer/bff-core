const express = require('express');
const expendService = require('../services/expendServices/expendService');
const router = express.Router();
const validate = require('../services/expendServices/validationsExpend');
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');
var { error } = 1;

router.get('/expend', async(req, res) => {
    const userToken = req.headers.authorization;
    const token = userToken.split(' ');
    const decode = jwt.verify(token[1], expresiones.secret);
    const user_id = decode.userId;
    let listFixed = [];
    let listDaily = []
    let listVariable = [];
    const { fixed } = req.query;
    const { month } = req.query;
    const { isDailyUse } = req.query;
    const response = await expendService.getExpend(user_id, month, null, fixed, isDailyUse);
    results = JSON.parse(JSON.stringify(response));
    results.forEach(element => {
        if (element.isDailyUse == 1) {
            listDaily.push(element);
        }
        if (element.id_fe == null) {
            listVariable.push(element);
        }
        if (element.id_fe != null && element.isDailyUse == 0) {
            listFixed.push(element);
        }
    });
    console.log(listFixed, listDaily, listVariable);
    res.json({
        listFixed,
        listDaily,
        listVariable
    });
});


router.post('/expend', validate.validate(validate.createExpendSchema), async(req, res) => {
    const userToken = req.headers.authorization;
    const token = userToken.split(' ');
    const decode = jwt.verify(token[1], expresiones.secret);
    const user_id = decode.userId;
    const { name, value, month, id_fe, isDailyUse } = req.body;
    console.log(name, value, month, id_fe, isDailyUse);
    const response = await expendService.setExpend(user_id, name, value, month, id_fe, isDailyUse)
    console.log("expendService.setExpend Response : " + JSON.stringify(response));
    error = 0;
    res.json({ error, response });
});

router.put('/expend', validate.validate(validate.updateExpendSchema), async(req, res) => {
    const userToken = req.headers.authorization;
    const token = userToken.split(' ');
    const decode = jwt.verify(token[1], expresiones.secret);
    const user_id = decode.userId;
    const { id } = req.query;
    const { name, value } = req.body;
    const response = await expendService.updateExpend(id, user_id, name, value);
    console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(response));
    error = 0;
    res.json({ error, response });
})

router.delete('/expend', async(req, res) => {
    const userToken = req.headers.authorization;
    const token = userToken.split(' ');
    const decode = jwt.verify(token[1], expresiones.secret);
    const user_id = decode.userId;
    const { id } = req.query;
    const response = await expendService.deleteExpend(id, user_id, null);
    console.log("expendService.DeleteExpend Response: " + JSON.stringify(response));
    error = 0;
    res.json({ error, response });
})

module.exports = router;