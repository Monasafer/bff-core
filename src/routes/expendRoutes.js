const express = require('express');
const expendService = require('../services/expendServices/expendService')
const router = express.Router();
const validation = require('../services/expendServices/validationsExpend')

router.get('/expend', async (req,res)=>{
          let user_id = req.headers['user-id'];
          const {startDate} = req.query; //TODO : Agregar valor por defecto principio de este mes
          const {endDate} = req.query; //TODO : Agregar valor por defecto fin de este mes
          const response = await expendService.getExpend(user_id, startDate, endDate);
          console.log("expendService.getExpend Response : " + response);
          res.json(response);    
});

router.post('/expend',validation.validate(validation.expendSchema),async (req, res) => {
          const user_id = req.headers['user-id'];
          const { descr, value, finish_date } = req.body;
          const response = await expendService.setExpend(user_id, descr, value, finish_date)
          console.log("expendService.setExpend Response : " + response);
          res.json(response);  
});
      
router.put('/expend/:expendId',validation.validate(validation.expendSchema), async (req, res) => {
        let user_id = req.headers['user-id'];
        let expendId = req.params.expendId;        
        const { descr, value, finish_date } = req.body;
        const response = await expendService.updateExpend(user_id, expendId, descr, value, finish_date)
        console.log("expendService.updateExpend Response : " + response);
        res.json(response);  
      });

router.put('/expend/:expendId/:payed',async (req, res) => {
        let user_id = req.headers['user-id'];
        let expendId = req.params.expendId;  
        let payed = req.params.payed;      
        const response = await expendService.updateExpendPayed(user_id, expendId,payed)
        console.log("expendService.updateExpendPayed Response : " + response);
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