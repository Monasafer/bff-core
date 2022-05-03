const express = require('express');
const expendService = require('../services/expendServices/expendService');
const router = express.Router();
const validate = require('../services/expendServices/validationsExpend');
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');
var { error } = 1;

router.get('/expend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        let listFixed = [];
        let listVariable = [];
        const response = await expendService.getExpend(user_id);
        
        results = JSON.parse(JSON.stringify(response));
        results.forEach(element => {
            if (element.id_fixed_expend == null) {
                listVariable.push(element);
            }
            if (element.id_fixed_expend != 1) {
                listFixed.push(element);
            }
        });
        res.json({
            listFixed,
            listVariable
        });
    } catch (error) {
        next(error)
    }

});


router.post('/expend', validate.validate(validate.createExpendSchema), async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { name, value, month, id_fixed_expend } = req.body;
        const response = await expendService.setExpend(user_id, name, value, month, id_fixed_expend)
        console.log("expendService.setExpend Response : " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }

});

router.put('/expend', validate.validate(validate.updateExpendSchema), async(req, res, next) => {
    try {
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
    } catch (error) {
        next(error)
    }

})

router.delete('/expend', async(req, res, next) => {
    try {
        const userToken = req.headers.authorization;
        const token = userToken.split(' ');
        const decode = jwt.verify(token[1], expresiones.secret);
        const user_id = decode.userId;
        const { id } = req.query;
        const response = await expendService.deleteExpend(id, user_id, null);
        console.log("expendService.DeleteExpend Response: " + JSON.stringify(response));
        error = 0;
        res.json({ error, response });
    } catch (error) {
        next(error)
    }
})

module.exports = router;