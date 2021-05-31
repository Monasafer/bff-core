const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');
////////////////////////////////////////////////////////////////////
router.get('/mona', (req, res)=>{      //TODOS LOS MONA
    conexion.query('SELECT * FROM mona WHERE mona_state_code = 1', function(err,result,fields){
        if (err) throw err;
        res.send(result)
    })  
});
////////////////////////////////////////////////////////////////////
router.get('/monadelete', (req, res)=>{      //TODOS LOS MONA ELIMINADOS
        conexion.query('SELECT * FROM mona WHERE mona_state_code = 0', function(err,result,fields){
            if (err) throw err;
            res.send(result)
        })  
    });
////////////////////////////////////////////////////////////////////
router.get('/mona/:user_id/:state_code',(req,res)=>{ //MONA POR USUARIO
        const {user_id} = req.params;
        const {state_code} = req.params;
        rows = [user_id,state_code];
        let query='SELECT * FROM mona WHERE (mona_user_id) = ? AND (mona_state_code)=?';
        pool.query(query,rows,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err);}
        });
});
////////////////////////////////////////////////////////////////////
router.post('/mona', (req, res) => { //Ingresar Mona
        const {mona_id, mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code} = req.body;
        const query = `insert into mona(mona_id, mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code)
        values(?, ?, ?,?,?,?);`;
        rows = [mona_id, mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code]
        pool.query(query, rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'mona Saved'});
          } else {
            console.log(err);
          }
        });
      });
////////////////////////////////////////////////////////////////////
router.put('/mona/:mona_id', (req, res) => {  //cambiar mona ingresando su ID
        let {mona_id} = req.params;
        let {mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code} = req.body;
        let query =  `UPDATE mona
                SET 
                mona_descr = ?, 
                mona_value = ?, 
                mona_creation_date = ?, 
                mona_state_code = ?
                WHERE mona_id = ?`;
        rows = [mona_descr, mona_value,mona_creation_date,mona_state_code,mona_id];
        pool.query(query,rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Mona Updated'});
          } else {
            console.log(err);
          }
        });
      });
////////////////////////////////////////////////////////////////////
router.put('/monadelete/:mona_id', (req, res) => {  //Eliminar gasto ingresando su ID
        let {mona_id} = req.params;
        let {mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code} = req.body;
        let query =  `UPDATE mona
                SET 
                mona_state_code = 0
                WHERE mona_id = ?`;
        rows = [mona_id];
        pool.query(query,rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Mona Eliminado correctamente'});
          } else {
            console.log(err);
          }
        });
      });
////////////////////////////////////////////////////////////////////
router.get('/mona/:user_id/:startDate/:endDate',(req,res)=>{ //MONA POR USUARIO entre Fechas
        const {user_id} = req.params;
        const {startDate} = req.params;
        const {endDate} = req.params;
        rows = [user_id,startDate,endDate];
        let query='select * from mona where (mona_user_id) = ? AND mona_creation_date >=?  AND mona_creation_date <=?  ';
        pool.query(query,rows,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err); }
        });
});
//Exportacion de ruta
module.exports = router; 