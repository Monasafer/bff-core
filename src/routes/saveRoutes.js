const express = require('express');
const conexion = require('../connection.js')
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
  router.get('/save/:user_id',(req,res)=>{ //AHORROS POR USUARIO
        const {user_id} = req.params;
        consulta='SELECT * FROM save WHERE (save_user_id) = ?';
        pool.query(consulta,user_id,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err);
                }
        });
});
////////////////////////////////////////////////////////////////////
router.post('/save', (req, res) => { //Ingresar Ahorro
        const {save_id, save_descr, save_value,save_pretend,save_user_id,save_creation_date,save_pretend_date,save_state_code} = req.body;
        const query = `insert into save(save_id, save_descr, save_value,save_pretend,save_user_id,save_creation_date,save_pretend_date,save_state_code)
        values(?, ?, ?,?,?,?,?,?);`;
        campos = [save_id, save_descr, save_value,save_pretend,save_user_id,save_creation_date,save_pretend_date,save_state_code]
        pool.query(query, campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'save Saved'});
          } else {
            console.log(err);
          }
        });
      });
////////////////////////////////////////////////////////////////////
router.put('/save/:save_id', (req, res) => {  //cambiar ahorro ingresando su ID
        const {save_id} = req.params;
        const {save_descr, save_value,save_pretend,save_creation_date,save_pretend_date,save_state_code} = req.body;
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
        campos = [save_descr, save_value,save_pretend,save_creation_date,save_pretend_date,save_state_code,save_id];
        console.log(campos);
        pool.query(query,campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'save Updated'});
          } else {
            console.log(err);
          }
        });
      });
////////////////////////////////////////////////////////////////////
router.put('/savedelete/:save_id', (req, res) => {  //Eliminar ahorro ingresando su ID
        const {save_id} = req.params;
        console.log(save_id);
        console.log(req.body);
        let query =  `UPDATE save
                SET 
                save_state_code = 0
                WHERE save_id = ?`;
        campos = [save_id];
        console.log(campos);
        pool.query(query,campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'save Eliminado correctamente'});
          } else {
            console.log(err);
          }
        });
      });

//Exportacion de ruta      
module.exports = router;