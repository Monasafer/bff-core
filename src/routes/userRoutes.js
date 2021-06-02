const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');
//------------------------------------------------------------------------------------------------------
router.get('/user', (req, res)=>{        //BUSCAR USUARIOS PASANDO SU ID
    const user_id = req.headers['user-id'];
    let   {state_code} = req.query;
    rows = [user_id,state_code];
    console.log(user_id);
    if(user_id==0){
        query ='SELECT * FROM user WHERE state_code = ?';
        pool.query(query,state_code,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err); }
        });
        } else{
        query ='SELECT * FROM user WHERE user_id =?';
        pool.query(query,user_id,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err); }
        });
} 
    consulta='SELECT * FROM user WHERE user_id=?'
});
//------------------------------------------------------------------------------------------------------
router.post('/user', (req, res) => { //Crear usuario
    const {user,pass,mail,creation_date} = req.body;
    console.log(mail);
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var valido=expReg.test(mail);
    if(valido==true){  //Verifico que la direccion de email sea valida
        const query = `insert into user(user_id,user,pass,mail,creation_date,state_code)
        values(0, ?, ?,?,?,1);`;
        campos = [user,pass,mail,creation_date]
        pool.query(query, campos, (err, rows, fields) => {
            if(!err) {
        res.json({status: 'User Saved'});
        } else {
        console.log(err); }
    });}
    else{
        console.log("CORREO NO VALIDO,VUELVA A INTENTAR");
    }
  });
//------------------------------------------------------------------------------------------------------
router.delete('/user', (req, res) => { //Crear usuario
    const user = req.headers['user-id'];
    let query =  `UPDATE user
                SET 
                state_code = 0
                WHERE user_id = ?`;
    rows = [user];
    pool.query(query,rows, (err, rows, fields) => {
        if(!err) {
             res.json({status: 'expend Eliminado correctamente'});
                 } else {
                        console.log(err);
                        }
                  });
  });
//Exportacion de ruta
module.exports = router;