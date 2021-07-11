const express = require('express');
const saveService = require('../services/saveServices/saveService')
const router = express.Router();
const validations = require('../services/saveServices/validationsSave')

router.get('/save', async (req, res) => {
  const user_id = req.headers['user-id'];
  const { month } = req.query;
  const response = await saveService.getSave(user_id, month);
  console.log("saveService.getSave Response : " + response);
  res.json(response);
});

router.post('/save', validations.validate(validations.createSaveSchema), async (req, res) => {
  const user_id = req.headers['user-id'];
  const { month } = req.query;
  const { name, value } = req.body;
  const response = await saveService.setSave(user_id, name, value, month)
  console.log("saveService.setSave Response : " + response);
  res.json(response);
});

router.put('/save', validations.validate(validations.updateSaveSchema), async (req, res) => {
  const user_id = req.headers['user-id'];
  const { id } = req.query;
  const { name, value } = req.body;
  const response = await saveService.updateSave(id, user_id, name, value)
  console.log("saveService.updateSave Response : " + response);
  res.json(response);
});

router.delete('/save', async (req, res) => {
  let user_id = req.headers['user-id'];
  const { id } = req.query;
  const response = await saveService.deleteSave(user_id, id)
  console.log("saveService.deleteSave Response : " + response);
  res.json(response);
});

module.exports = router;
