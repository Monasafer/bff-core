const express = require('express');
const conexion = require('../connection.js');
const { query } = require('../database');
const router = express.Router();
const pool = require('../database');
////////////////////////////////////////////////////////////////////
router.get('/save', (req,res)=>{                                           // AHORROS Y PLAN DE AHORRO \\
    conexion.query('SELECT * FROM save WHERE save_state_code = 1', function (err,result,fields){
        if (err) throw err;
        res.send(result)
    })  
  })
////////////////////////////////////////////////////////////////////
router.get('/savedelete', (req,res)=>{                                           // AHORROS Y PLAN DE AHORRO ELIMINADOS \\
        conexion.query('SELECT * FROM save WHERE save_state_code = 0', function (err,result,fields){
            if (err) throw err;
            res.send(result)
        })  
      })
////////////////////////////////////////////////////////////////////
  router.get('/save/:user_id/:state_code',(req,res)=>{ //AHORROS POR USUARIO
        let {user_id} = req.params;
        let {state_code} = req.params;
        rows = [user_id,state_code];
        let query='SELECT * FROM save WHERE (save_user_id) = ? AND (save_state_code)=?';
        pool.query(query,rows,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err);
                }
        });
});
////////////////////////////////////////////////////////////////////
router.post('/save', (req, res) => { //Ingresar Ahorro
        let {save_id, save_descr, save_value,save_pretend,save_user_id,save_creation_date,save_pretend_date,save_state_code} = req.body;
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
////////////////////////////////////////////////////////////////////
router.put('/save/:save_id', (req, res) => {  //cambiar ahorro ingresando su ID
        let {save_id} = req.params;
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
////////////////////////////////////////////////////////////////////
router.put('/savedelete/:save_id', (req, res) => {  //Eliminar ahorro ingresando su ID
        let {save_id} = req.params;
        console.log(save_id);
        console.log(req.body);
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

//Exportacion de ruta      
module.exports = router;