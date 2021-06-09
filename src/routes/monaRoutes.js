
const express = require('express');
const monaService = require('../services/monaService')

const router = express.Router();

router.get('/mona', async (req,res)=>{
          let user_id = req.headers['user-id'];
          const {startDate} = req.query; //TODO : Agregar valor por defecto principio de este mes
          const {endDate} = req.query; //TODO : Agregar valor por defecto fin de este mes

          const response = await monaService.getMona(user_id, startDate, endDate);
          console.log("monaService.getMona Response : " + response);
          res.json(response);    
});

router.post('/mona', async (req, res) => {
          let user_id = req.headers['user-id'];
          const timeElapsed = Date.now();
          const creation_date = new Date(timeElapsed).toISOString();
          const { descr, value } = req.body;

          const response = await monaService.setMona(user_id, creation_date, descr, value)
          console.log("monaService.setMona Response : " + response);
          res.json(response);  
});
      
router.put('/mona/:monaId', async (req, res) => {
        let user_id = req.headers['user-id'];
        let monaId = req.params.monaId;        
        const { descr, value } = req.body;

        const response = await monaService.updateMona(user_id, monaId, descr, value)
        console.log("monaService.updateMona Response : " + response);
        res.json(response);  
      });
      
router.delete('/mona/:monaId', async (req, res) => {
        let user_id = req.headers['user-id'];
        let monaId = req.params.monaId;

        const response = await monaService.deleteMona(user_id, monaId)
        console.log("monaService.deleteMona Response : " + response);
        res.json(response);  
      });
      
module.exports = router; 