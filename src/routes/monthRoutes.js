const express = require('express');
const router = express.Router();
const monthService = require("../services/monthServices/monthService");
const validations = require('../services/monthServices/validationsMonth');

router.get('/month', async (req, res) => {
    let user_id = req.headers['user-id'];
    const { month } = req.query;
    const response = await monthService.getMonth(user_id, month);
    console.log("monthService.getMonth Response : " + JSON.stringify(response));
    res.json(response);
});

router.post('/month',validations.validate(validations.createMonthSchema), async (req, res) => {
    const user_id = req.headers['user-id'];
    const { month } = req.body;
    const response = await monthService.setMonth(user_id, month)
    console.log("monthService.setMonth Response : " + JSON.stringify(response));
    res.json(response);
});

router.delete('/month', async (req, res) => {
    const user_id = req.headers['user-id'];
    const { id } = req.query;
    const response = await monthService.deleteMonth(user_id, id);
    console.log("monthService.deleteMonth Response: " + JSON.stringify(response));
    res.json(response);
})

module.exports = router;