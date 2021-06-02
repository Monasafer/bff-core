const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');
//------------------------------------------------------------------------------------------------------
router.get('/mona',(req,res)=>{ //MONA POR USUARIO
        let user_id = req.headers['user-id'];
        let   {state} = req.query;
        if(user_id==0){
          query ='SELECT * FROM mona WHERE (mona_state_code)=?';
          rows = [state];
          pool.query(query,rows,(err,result)=>{
            if(!err){
                    res.json(result);
            }else{
                    console.log(err); }
    });
        }
        else{
          query='SELECT * FROM mona WHERE (mona_user_id) = ? AND (mona_state_code)=?';
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
router.post('/mona', (req, res) => { //Ingresar Mona
        let mona_user_id = req.headers['user-id'];
        let mona_id = 0;
        const {mona_descr, mona_value,mona_creation_date,mona_state_code} = req.body;
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
//------------------------------------------------------------------------------------------------------
router.put('/mona', (req, res) => {  //cambiar mona ingresando su ID
        let mona_id = req.headers['mona-id'];
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
router.delete('/mona', (req, res) => {  //Eliminar gasto ingresando su ID
        let mona_id = req.headers['mona-id'];
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
router.get('/monadates',(req,res)=>{ //MONA POR USUARIO entre Fechas
        let   user_id =  req.headers['user-id'];
        const {startDate} = req.query;
        const {endDate} = req.query;
        rows = [user_id,startDate,endDate];
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