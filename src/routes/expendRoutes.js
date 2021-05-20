const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');

/////////////////////////////////////////////////////////////
router.get('/expend', (req, res)=>{        //TODOS LOS GASTOS 
        console.log("expend active")
        pool.query('SELECT * FROM expend', function(err,result,fields){
                if (err) throw err;
                //console.log(result);
                res.json(result);
        });
});
///////////////////////////////////////////////////////////////
router.get('/expend/:user_id',(req,res)=>{ //GASTOS POR USUARIO
        const {user_id} = req.params;
        console.log(user_id);
        consulta='SELECT * FROM expend WHERE (expen_user_id) = ?';
        pool.query(consulta,user_id,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err);
                }
        });
});
///////////////////////////////////////////////////////////
router.post('/expend', (req, res) => { //Ingresar
        const {expen_id, expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code} = req.body;
        console.log(expen_id, expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code);
        const query = `insert into expend(expen_id,expen_descr,expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code)
        values(?, ?, ?,?,?,?,?);`;
        campos = [expen_id, expen_descr, expen_value,expen_user_id,expen_creation_date,expen_finish_date,expen_state_code]
        pool.query(query, campos, (err, rows, fields) => {
          if(!err) {
            res.json({status: 'expen Saved'});
          } else {
            console.log(err);
          }
        });
      });

/*
// router.put('/:id' , (req, res)=>{
        
//         let sql = `UPDATE expend
//                 SET expen_descr = ?, 
//                 expen_value = ?, 
//                 expen_user_id = ?, 
//                 expen_creation_date = ?, 
//                 expen_finish_date= ?, 
//                 expen_state_code = ?
//                 WHERE expen_id = ?`
        
//         let params = [
//                 req.body.descr, 
//                 req.body.value, 
//                 req.session.idUser = 1, //HARDCODEADO - NO HACE EL EDIT SIN ESTO,
//                 req.body.creationdate, 
//                 req.body.finishdate, 
//                 req.body.statecode = 1, //HARDCODEADO - NO HACE EL EDIT SIN ESTO,SI LE PONES EL STATECODE EN 0 NO MUESTRA POR PANTALLA
//                 req.params.id
//                 ];
        
//         conexion.query(sql, params, function(err,result,fields){

//                 let respuesta;

//                 if (err){
//                         respuesta={
//                                         status: 'error',
//                                         message: 'Error al modificar la receta',
//                                   }
//                 }
//                 else{
//                         respuesta= {
//                                         status: 'ok',
//                                         message: 'la respuesta se agregó',
//                                   }
//                 }
//                 res.json(respuesta);

//         })


// })


//////////////////////////////// ES EL ELIMINAR (DELETE) PERO CON METODO PUT /////////////////////

router.put('/:id', (req, res)=>{

        console.log(req.body)
        console.log(req.params)
        console.log(req.session)
        
        let sql = `UPDATE expend
                SET ?
                WHERE expen_id = ?`
        
        let params = [
                req.body, 
                req.params.id
                ];
        
        conexion.query(sql, params, function(err,result,fields){

                let respuesta;

                if (err){
                        respuesta={
                                status: 'error',
                                message: 'Error al modificar la receta',
                                err: err
                        }       
                }
                else{
                        respuesta= {
                                        status: 'ok',
                                        message: 'la respuesta se agregó',
                                  }
                }
                res.json(respuesta);

        })


})
*/
module.exports = router;