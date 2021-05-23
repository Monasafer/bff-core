const express = require('express');
const conexion = require('../connection.js')
const router = express.Router();
const pool = require('../database');
////////////////////////////////////////////////////////////////////
router.get('/save', (req,res)=>{                                           // AHORROS Y PLAN DE AHORRO \\
    conexion.query('SELECT * FROM save WHERE save_state_code = 1', function (err,result,fields){
        if (err) throw err;
        //console.log(result);
        res.send(result)
    })  
  })
////////////////////////////////////////////////////////////////////
  router.get('/save/:user_id',(req,res)=>{ //AHORROS POR USUARIO
        const {user_id} = req.params;
        console.log(user_id);
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
        console.log(save_id, save_descr, save_value,save_pretend,save_user_id,save_creation_date,save_pretend_date,save_state_code);
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


/*
////////////////////////////////////////////////////////PUT - CHEQUEAR SI ANDA POR POSTMAN////////////////////////////////////////////

// router.put('/:id', (req, res)=>{ //save_descr, save_value, save_pretend, save_user_id, save_creation_date, save_pretend_date, save_state_code
//     console.log(req.body)
//     let sql = `UPDATE save
//             SET save_descr = ?, 
//             save_value = ?, 
//             save_pretend= ?,
//             save_user_id = ?, 
//             save_creation_date = ?, 
//             save_pretend_date= ?,
//             save_state_code = ?
//             WHERE save_id = ?` // TENGO QUE PONER EL  ---------WHERE mona_id 4{req.params.id}----- para que ande por postman
    
//     let params = [
//             req.body.descr, 
//             req.body.value,
//             req.body.pretend, 
//             req.body.idUser, // tengo que poner req.query.idUser para que lo tome desde el postman
//             req.body.creationdate,
//             req.body.pretenddate,  
//             req.body.statecode , 
//             //req.params.id //el req.params.id por postman no es necesaro
//             ];
            
//     conexion.query(sql, params, function(err,result,fields){
  
//             let respuesta;
  
//             if (err){
//                     respuesta={
//                                     status: 'error',
//                                     message: 'Error al modificar el ingreso',
//                               }
//             }
//             else{
//                     respuesta= {
//                                     status: 'ok',
//                                     message: 'El ingreso se modificó',
//                               }
//             }
//             res.json(respuesta);
//             console.log(req.query)
//             console.log(err)
  
//     })
  
  
//   })
  
  /////EL DELETE VIENE POR JAVASCRIPT, SOLO SE CAMBIA EL STATE CODE A 0 ASI NO SE MUESTRA EN PANTALLA ////

  router.put('/:id', (req, res)=>{

        console.log(req.body)
        console.log(req.params)
        console.log(req.session)
        
        let sql = `UPDATE save
                SET ?
                WHERE save_id = ?`
        
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