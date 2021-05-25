const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');

router.get('/user', (req, res)=>{        //TODOS LOS USUARIOS 
            console.log("user active")
            pool.query('SELECT * FROM user', function(err,result,fields){
                    if (err) throw err;
                    res.json(result);
            });
    });
/////////////////////////////////////////////////////////////
router.get('/user/:user_id', (req, res)=>{        //BUSCAR USUARIOS PASANDO SU ID
    const {user_id} = req.params;
    consulta='SELECT * FROM user WHERE user_id=?'
    pool.query(consulta,user_id,function(err,result,fields){
            if (err) throw err;
            res.json(result);
    });
});
/////////////////////////////////////////////////////////////
router.post('/Createuser', (req, res) => { //Crear usuario
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

  
//Exportacion de ruta
module.exports = router;