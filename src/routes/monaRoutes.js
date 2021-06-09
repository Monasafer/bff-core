const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');

router.get('/mona',(req,res)=>{
        let user_id = req.headers['user-id'];
        const {startDate} = req.query; //TODO : Agregar valor por defecto principio de este mes
        const {endDate} = req.query; //TODO : Agregar valor por defecto fin de este mes
        rows = [user_id,startDate,endDate];
        query='SELECT * FROM mona WHERE (user_id) = ? AND (state_code)=1 AND creation_date >=? AND creation_date <=?';
        pool.query(query,rows,(err,result)=>{
          if(!err){
            res.json(result);
          }else{
            console.log(err); }
    });
        
});

router.post('/mona', (req, res) => {
        let user_id = req.headers['user-id'];
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        const { descr, value } = req.body;
        const query = `insert into mona(descr, value, user_id, creation_date, state_code) values(?,?,?,?,1)`;

        rows = [descr, value, user_id, creation_date]
        console.log("Insert Mona with data : " + rows)

        pool.query(query, rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Mona Saved'});
          } else {
            console.log(err);
          }
        });
      });
      
router.put('/mona/:monaId', (req, res) => {
        //TODO : Validar que el usuario que updetea es el dueño del registro 

        let monaId = req.params.monaId;        
        const { descr, value } = req.body;
        let query =  `UPDATE mona
                SET 
                descr = ?, 
                value = ?
                WHERE id = ?`;
        rows = [descr, value, monaId];
        pool.query(query,rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Mona Id : ' + monaId + ' Updated'});
          } else {
            console.log(err);
          }
        });
      });
      
router.delete('/mona/:monaId', (req, res) => {
            //TODO : Validar que el usuario que deletea es el dueño del registro 

        let monaId = req.params.monaId;
        let query =  `UPDATE mona
                SET 
                state_code = 0
                WHERE id = ?`;
        rows = [monaId];
        pool.query(query,rows, (err, rows) => {
          if(!err) {
            res.json({status: 'Mona Id : '+ monaId +' Deleted'});
          } else {
            console.log(err);
          }
        });
      });
      
module.exports = router; 