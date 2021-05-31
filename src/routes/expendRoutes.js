const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');
/////////////////////////////////////////////////////////////
router.get('/expend', (req, res)=>{        //TODOS LOS GASTOS 
        console.log("expend active")
        pool.query('SELECT * FROM expend WHERE (expen_state_code)=1', function(err,result,fields){
                if (err) throw err;
                res.json(result);
        });
});
/////////////////////////////////////////////////////////////
router.get('/expendelete', (req, res)=>{        //TODOS LOS GASTOS ELIMINADOS
        console.log("expend active")
        pool.query('SELECT * FROM expend WHERE (expen_state_code)=0', function(err,result,fields){
                if (err) throw err;
                res.json(result);
        });
});
///////////////////////////////////////////////////////////////
router.get('/expend/:user_id/:state_code',(req,res)=>{ //GASTOS POR USUARIO 
        const  {user_id} = req.params;
        const  {state_code} = req.params;
        rows = [user_id,state_code];
        query ='SELECT * FROM expend WHERE (expen_user_id) = ? AND (expen_state_code)=?';
        pool.query(query,rows,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err); }
        });
});
///////////////////////////////////////////////////////////
router.post('/expend', (req, res) => { //Ingresar Gasto pasandole expen_id=0
        const {expen_id, expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code} = req.body;
        const  query = `insert into expend(expen_id,expen_descr,expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code)
        values(?, ?, ?,?,?,?,?);`;
        rows = [expen_id, expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code]
        pool.query(query, rows, (err, rows, fields) => {
          if(!err) {
                res.json({status: 'expend Saved'});
          } else {
                console.log(err);
          }
        });
      });
///////////////////////////////////////////////////////////
router.put('/expend/:expen_id', (req, res) => {  //cambiar gasto ingresando su ID
        let {expen_id} = req.params;
        let {expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code} = req.body;
        let query      =  `UPDATE expend
                                SET 
                                        expen_descr = ?, 
                                        expen_value = ?, 
                                        expen_creation_date = ?, 
                                        expen_finish_date= ?, 
                                        expen_state_code = ?
                                        WHERE expen_id = ?`;
                                        
        rows = [expen_descr, expen_value,expen_creation_date,expen_finish_date,expen_state_code,expen_id];
        pool.query(query,rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'expend Updated'});
          } else {
            console.log(err);
          }
        });
      });
///////////////////////////////////////////////////////////
router.put('/expendelete/:expen_id', (req, res) => {  //Eliminar gasto ingresando su ID
        let {expen_id} = req.params;
        let {expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code} = req.body;
        let query =  `UPDATE expend
                SET 
                expen_state_code = 0
                WHERE expen_id = ?`;
        rows = [expen_id];
        pool.query(query,rows, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'expend Eliminado correctamente'});
          } else {
            console.log(err);
          }
        });
      });
///////////////////////////////////////////////////////////
router.get('/expend/:user_id/:startDate/:endDate',(req,res)=>{ //GASTOS POR USUARIO entre Fechas
        const {user_id} = req.params;
        const {startDate} = req.params;
        const {endDate} = req.params;
        rows = [user_id,startDate,endDate];
        let query='select * from expend where (expen_user_id) = ? AND expen_creation_date >=?  AND expen_finish_date <=?  ';
        pool.query(query,rows,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err); }
        });
});


//Exportacion de ruta
module.exports = router;