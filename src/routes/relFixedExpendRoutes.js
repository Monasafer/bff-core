const express = require('express');
const fixedExpendService = require('../services/fixedExpend/relFixedExpendService');
const router = express.Router();
const validate = require('../services/fixedExpend/validationsRelFixedExpend')

router.get('/relFixedExpend', async (req, res) => {
    let user_id = req.headers['user_id'];
    const response = await fixedExpendService.getFixedExpend(user_id);
    console.log("FixedExpendService.getFixedExpend Response : " + response);
    res.json(response);
});

router.post('/relFixedExpend',validate.validate(validate.createFixedExpendSchema), async (req, res) => {
    const user_id = req.headers['user_id'];
    const response = await fixedExpendService.setFixedExpend(user_id);
    console.log("FixedExpendService.setFixedExpend Response : " + JSON.stringify(response));
    res.json(response);
});

router.put('/relFixedExpend',validate.validate(validate.updateFixedExpendSchema), async (req, res) => {
    const user_id = req.headers['user_id'];
    const { id_fe } = req.query;
    const { active } = req.body;
    const response = await fixedExpendService.updateFixedExpend(id_fe, user_id, active);
    console.log("fixedExpendService.updateFixedExpend Response: " + JSON.stringify(response));
    res.json(response);
})

router.delete('/relFixedExpend',validate.validate(validate.updateFixedExpendSchema), async (req, res) => {
    const user_id = req.headers['user_id'];
    const { id_fe } = req.query;
    const response = await fixedExpendService.deleteFixedExpend(user_id, id_fe)
    console.log("fixedExpendService.deleteFixedExpend Response: " + JSON.stringify(response));
    res.json(response);
})

module.exports = router;