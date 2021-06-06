const express = require('express');
let conexion = require('../connection.js');
let { query } = require('../database');
let router = express.Router();
let pool = require('../database');

//------------------------------------------------------------------------------------------------------
router.get('/save',(req,res)=>{ //SAVES
  let   user_id =  req.headers['user-id'];
  let   {state} = req.query;
  if(user_id==0){
          query ='SELECT * FROM save WHERE (save_state_code)=?';
          rows = [state];
          pool.query(query,rows,(err,result)=>{
                  if(!err){
                          res.json(result);
                  }else{
                          console.log(err); }
          });
  } else{
          query ='SELECT * FROM save WHERE (save_user_id) = ? AND (save_state_code)=?';
          rows = [user_id,state];
          pool.query(query,rows,(err,result)=>{
                  if(!err){
                          res.json(result);
                  }else{
                          console.log(err); }
          });
  }    
});
//------------------------------------------------------------------------------------------------------
router.post('/save', (req, res) => { //Ingresar Ahorro
        let   save_user_id =  req.headers['user-id'];
        let {save_id, save_descr, save_value,save_pretend,save_creation_date,save_pretend_date,save_state_code} = req.body;
        let query = `insert into save(save_id, save_descr, save_value,save_pretend,save_user_id,save_creation_date,save_pretend_date,save_state_code)
        values(?, ?, ?,?,?,?,?,?);`;
        rows = [save_id, save_descr, save_value,save_pretend,save_user_id,save_creation_date,save_pretend_date,save_state_code]
        pool.query(query, rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'save Saved'});
          } else {
            console.log(err);
          }
        });
      });
//------------------------------------------------------------------------------------------------------
router.put('/save', (req, res) => {  //cambiar ahorro ingresando su ID
        let save_id = req.headers['save-id'];
        let {save_descr, save_value,save_pretend,save_creation_date,save_pretend_date,save_state_code} = req.body;
        let query =  `UPDATE save
                SET 
                save_descr = ?, 
                save_value = ?, 
                save_pretend = ?,
                save_creation_date = ?, 
                save_pretend_date= ?, 
                save_state_code = ?
                WHERE save_id = ?`;
        save_state_code = 1;
        rows = [save_descr, save_value,save_pretend,save_creation_date,save_pretend_date,save_state_code,save_id];
        pool.query(query,rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'save Updated'});
          } else {
            console.log(err);
          }
        });
      });
//------------------------------------------------------------------------------------------------------
router.delete('/save', (req, res) => {  //Eliminar ahorro ingresando su ID
        let save_id = req.headers['save-id'];
        let query =  `UPDATE save
                SET 
                save_state_code = 0
                WHERE save_id = ?`;
        rows = [save_id];
        pool.query(query,rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'save Eliminado correctamente'});
          } else {
            console.log(err);
          }
        });
      });
//------------------------------------------------------------------------------------------------------
router.get('/savedates',(req,res)=>{ //SAVES POR USUARIO entre Fechas
  let   user_id =  req.headers['user-id'];
  const {startDate} = req.query;
  const {endDate} = req.query;
  rows = [user_id,startDate,endDate];
  let query='select * from save where (save_user_id) = ? AND save_creation_date >=?  AND save_finish_date <=?  ';
  pool.query(query,rows,(err,result)=>{
          if(!err){
                  res.json(result);
          }else{
                  console.log(err); }
  });
});
//Exportacion de ruta      
module.exports = router;