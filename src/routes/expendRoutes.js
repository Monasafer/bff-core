const express = require('express');
const expendService = require('../services/expendService')
const router = express.Router();

router.get('/expend', async (req,res)=>{
          let user_id = req.headers['user-id'];
          const {startDate} = req.query; //TODO : Agregar valor por defecto principio de este mes
          const {endDate} = req.query; //TODO : Agregar valor por defecto fin de este mes
          const response = await expendService.getExpend(user_id, startDate, endDate);
          console.log("expendService.getExpend Response : " + response);
          res.json(response);    
});

router.post('/expend', async (req, res) => {
          const user_id = req.headers['user-id'];
          const { descr, value, finish_date } = req.body;
          const response = await expendService.setExpend(user_id, descr, value, finish_date)
          console.log("expendService.setExpend Response : " + response);
          res.json(response);  
});
      
router.put('/expend/:expendId', async (req, res) => {
        let user_id = req.headers['user-id'];
        let expendId = req.params.expendId;        
        const { descr, value, finish_date } = req.body;
        const response = await expendService.updateExpend(user_id, expendId, descr, value, finish_date)
        console.log("expendService.updateExpend Response : " + response);
        res.json(response);  
      });
      
router.delete('/expend/:expendId', async (req, res) => {
        let user_id = req.headers['user-id'];
        let expendId = req.params.expendId;
        const response = await expendService.deleteExpend(user_id, expendId)
        console.log("expendService.deleteExpend Response : " + response);
        res.json(response);  
      });
      
module.exports = router; 