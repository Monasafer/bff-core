const express = require('express');
const expendService = require('../services/expendServices/expendService');
const router = express.Router();
const validate = require('../services/expendServices/validationsExpend');

router.get('/expend', async (req, res) => {
    let user_id = req.headers['user-id'];
    const { fixed } = 0;
    const { month } = req.query;
    const response = await expendService.getExpend(user_id, month, null ,fixed);
    console.log("expendService.getExpend Response : " + response);
    res.json(response);
});

router.post('/expend', validate.validate(validate.createExpendSchema), async (req, res) => {
    const user_id = req.headers['user-id'];
    const { name, value, month, id_fe } = req.body;
    const response = await expendService.setExpend(user_id, name, value, month, id_fe)
    console.log("expendService.setExpend Response : " + JSON.stringify(response));
    res.json(response);
});

router.put('/expend', validate.validate(validate.updateExpendSchema), async (req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const { name, value } = req.body;
    const response = await expendService.updateExpend(id, user_id, name, value);
    console.log("ExpendService.UpdateExpend Response: " + JSON.stringify(response));
    res.json(response);
})

router.delete('/expend', async (req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const response = await expendService.deleteExpend(id, user_id,null);
    console.log("expendService.DeleteExpend Response: " + JSON.stringify(response));
    res.json(response);
})

module.exports = router;