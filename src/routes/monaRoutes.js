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
router.get('/mona/:user_id',(req,res)=>{ //MONA POR USUARIO
        const {user_id} = req.params;
        consulta='SELECT * FROM mona WHERE (mona_user_id) = ?';
        pool.query(consulta,user_id,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err);}
        });
});
////////////////////////////////////////////////////////////////////
router.get('/monadelete/:user_id',(req,res)=>{ //MONA ELIMINADOS POR USUARIO
        const {user_id} = req.params;
        consulta='SELECT * FROM mona WHERE (mona_user_id) = ?   AND mona_state_code = 0';
        pool.query(consulta,user_id,(err,result)=>{
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
        campos = [mona_id, mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code]
        pool.query(query, campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'mona Saved'});
          } else {
            console.log(err);
          }
        });
      });
////////////////////////////////////////////////////////////////////
router.put('/mona/:mona_id', (req, res) => {  //cambiar mona ingresando su ID
        const {mona_id} = req.params;
        const {mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code} = req.body;
        console.log(req.body);
        let query =  `UPDATE mona
                SET 
                mona_descr = ?, 
                mona_value = ?, 
                mona_creation_date = ?, 
                mona_state_code = ?
                WHERE mona_id = ?`;
        campos = [mona_descr, mona_value,mona_creation_date,mona_state_code,mona_id];
        console.log(campos);
        pool.query(query,campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Mona Updated'});
          } else {
            console.log(err);
          }
        });
      });
////////////////////////////////////////////////////////////////////
router.put('/monadelete/:mona_id', (req, res) => {  //Eliminar gasto ingresando su ID
        const {mona_id} = req.params;
        const {mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code} = req.body;
        console.log(req.body);
        let query =  `UPDATE mona
                SET 
                mona_state_code = 0
                WHERE mona_id = ?`;
        campos = [mona_id];
        console.log(campos);
        pool.query(query,campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'Mona Eliminado correctamente'});
          } else {
            console.log(err);
          }
        });
      });
//Exportacion de ruta
module.exports = router; 