const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');
/////////////////////////////////////////////////////////////
router.get('/expend', (req, res)=>{        //TODOS LOS GASTOS 
        console.log("expend active")
        pool.query('SELECT * FROM expend WHERE (expen_state_code)=1', function(err,result,fields){
                if (err) throw err;
                //console.log(result);
                res.json(result);
        });
});
/////////////////////////////////////////////////////////////
router.get('/expendelete', (req, res)=>{        //TODOS LOS GASTOS ELIMINADOS
        console.log("expend active")
        pool.query('SELECT * FROM expend WHERE (expen_state_code)=0', function(err,result,fields){
                if (err) throw err;
                //console.log(result);
                res.json(result);
        });
});
///////////////////////////////////////////////////////////////
router.get('/expend/:user_id',(req,res)=>{ //GASTOS POR USUARIO 
        const {user_id} = req.params;
        console.log(user_id);
        consulta='SELECT * FROM expend WHERE (expen_user_id) = ? AND (expen_state_code)=1';
        pool.query(consulta,user_id,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err); }
        });
});
///////////////////////////////////////////////////////////////
router.get('/expendelete/:user_id',(req,res)=>{ //GASTOS ELIMINADOS POR USUARIO 
        const {user_id} = req.params;
        console.log(user_id);
        consulta='SELECT * FROM expend WHERE (expen_user_id) = ? AND (expen_state_code)=0';
        pool.query(consulta,user_id,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err);}
        });
});
///////////////////////////////////////////////////////////
router.post('/expend', (req, res) => { //Ingresar Gasto
        const {expen_id, expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code} = req.body;
        console.log(expen_id, expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code);
        const query = `insert into expend(expen_id,expen_descr,expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code)
        values(?, ?, ?,?,?,?,?);`;
        campos = [expen_id, expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code]
        pool.query(query, campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'expend Saved'});
          } else {
            console.log(err);
          }
        });
      });
///////////////////////////////////////////////////////////
router.put('/expend/:expen_id', (req, res) => {  //cambiar gasto ingresando su ID
        const {expen_id} = req.params;
        console.log(expen_id);
        const {expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code} = req.body;
        console.log(req.body);
        let query =  `UPDATE expend
                SET 
                expen_descr = ?, 
                expen_value = ?, 
                expen_creation_date = ?, 
                expen_finish_date= ?, 
                expen_state_code = ?
                WHERE expen_id = ?`;
        campos = [expen_descr, expen_value,expen_creation_date,expen_finish_date,expen_state_code,expen_id];
        console.log(campos);
        pool.query(query,campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'expend Updated'});
          } else {
            console.log(err);
          }
        });
      });
///////////////////////////////////////////////////////////
router.put('/expendelete/:expen_id', (req, res) => {  //Eliminar gasto ingresando su ID
        const {expen_id} = req.params;
        console.log(expen_id);
        const {expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code} = req.body;
        console.log(req.body);
        let query =  `UPDATE expend
                SET 
                expen_state_code = 0
                WHERE expen_id = ?`;
        campos = [expen_id];
        console.log(campos);
        pool.query(query,campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'expend Eliminado correctamente'});
          } else {
            console.log(err);
          }
        });
      });
//Exportacion de ruta
module.exports = router;