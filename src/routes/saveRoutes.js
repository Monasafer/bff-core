const express = require('express');
const saveService = require('../services/saveService')
const router = express.Router();

router.get('/save', async (req,res)=>{
          let user_id = req.headers['user-id'];
          const {startDate} = req.query; //TODO : Agregar valor por defecto principio de este mes
          const {endDate} = req.query; //TODO : Agregar valor por defecto fin de este mes
          const response = await saveService.getSave(user_id, startDate, endDate);
          console.log("saveService.getSave Response : " + response);
          res.json(response);    
});

router.post('/save', async (req, res) => {
          const user_id = req.headers['user-id'];
          const { descr, value } = req.body;
          const response = await saveService.setSave(user_id, descr, value,)
          console.log("saveService.setSave Response : " + response);
          res.json(response);  
});
      
router.put('/save/:saveId', async (req, res) => {
        let user_id = req.headers['user-id'];
        let saveId = req.params.saveId;        
        const { descr, value} = req.body;
        const response = await saveService.updateSave(user_id, saveId, descr, value)
        console.log("saveService.updateSave Response : " + response);
        res.json(response);  
      });
      
router.delete('/save/:saveId', async (req, res) => {
        let user_id = req.headers['user-id'];
        let saveId = req.params.saveId;
        const response = await saveService.deleteSave(user_id, saveId)
        console.log("saveService.deleteSave Response : " + response);
        res.json(response);  
      });
      
module.exports = router; 
