const express = require('express');
const specialExpendService = require('../services/specialExpendServices/specialExpendService')
const router = express.Router();
const validation = require('../services/specialExpendServices/validationSpecialExpend')

router.get('/specialExpend', async (req,res)=>{
          let user_id = req.headers['user-id'];
          const {startDate} = req.query; //TODO : Agregar valor por defecto principio de este mes
          const {endDate} = req.query; //TODO : Agregar valor por defecto fin de este mes
          const response = await specialExpendService.getSpecialExpend(user_id, startDate, endDate);
          console.log("SpecialExpendService.getSpecialExpend Response : " + response);
          res.json(response);    
});

router.post('/specialExpend',validation.validate(validation.specialExpendSchema),async (req, res) => {
          const user_id = req.headers['user-id'];
          const { name, value, finish_date } = req.body;
          const response = await specialExpendService.setSpecialExpend(user_id, name, value, finish_date)
          console.log("SpecialExpendService.setSpecialExpend Response : " + response);
          res.json(response);  
});
      
router.put('/specialExpend/:expendId',validation.validate(validation.specialExpendSchema), async (req, res) => {
        let user_id = req.headers['user-id'];
        let specialExpendId = req.params.expendId;        
        const { name, value, finish_date,payed } = req.body;
        const response = await specialExpendService.updateSpecialExpend(user_id, specialExpendId, name, value, finish_date,payed)
        console.log("SpecialExpendService.updateSpecialExpend Response : " + response);
        res.json(response);  
      });

router.delete('/specialExpend/:expendId', async (req, res) => {
        let user_id = req.headers['user-id'];
        let specialExpendId = req.params.expendId;
        const response = await specialExpendService.deleteSpecialExpend(user_id, specialExpendId)
        console.log("SpecialExpendService.deleteSpecialExpend Response : " + response);
        res.json(response);  
      });
      
module.exports = router; 