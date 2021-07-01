const express = require('express');
const expendService = require('../services/expendServices/expendService')
const router = express.Router();
const validation = require('../services/expendServices/validationsExpend')

router.get('/expend', async (req,res)=>{
          let user_id = req.headers['user-id'];
          const {month} = req.query;
          const response = await expendService.getExpend(user_id, month);
          console.log("expendService.getExpend Response : " + response);
          res.json(response);    
});

router.post('/expend',validation.validate(validation.expendSchema),async (req, res) => {
          const user_id = req.headers['user-id'];
          const { name, value, month, recurrent, payed } = req.body;
          const response = await expendService.setExpend(user_id, name, value, month, recurrent, payed)
          console.log("expendService.setExpend Response : " + JSON.stringify(response));
          res.json(response);  
});
      
router.put('/expend/:expendId',validation.validate(validation.expendSchema), async (req, res) => {
        let user_id = req.headers['user-id'];
        let expendId = req.params.expendId;        
        const { name, value, recurrent, payed } = req.body;
        const response = await expendService.updateExpend(user_id, expendId, name, value, recurrent, payed)
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