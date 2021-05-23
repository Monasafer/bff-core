const express = require('express');
const conexion = require('../connection')
const router = express.Router();
const pool = require('../database');
////////////////////////////////////////////////////////////////////
router.get('/mona', (req, res)=>{                 //MONA
    
    conexion.query('SELECT * FROM mona WHERE mona_state_code = 1', function(err,result,fields){
        if (err) throw err;

        console.log(result)

        res.send(result)
    })  
});
////////////////////////////////////////////////////////////////////
router.get('/mona/:user_id',(req,res)=>{ //GASTOS POR USUARIO
        const {user_id} = req.params;
        console.log(user_id);
        consulta='SELECT * FROM mona WHERE (mona_user_id) = ?';
        pool.query(consulta,user_id,(err,result)=>{
                if(!err){
                        res.json(result);
                }else{
                        console.log(err);
                }
        });
});
////////////////////////////////////////////////////////////////////
router.post('/mona', (req, res) => { //Ingresar Mona
        const {mona_id, mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code} = req.body;
        console.log(mona_id, mona_descr, mona_value,mona_user_id,mona_creation_date,mona_state_code);
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


/*
////////////////////////////////////////////////////////PUT - CHEQUEAR SI ANDA POR POSTMAN////////////////////////////////////////////

// router.put('/:id', (req, res)=>{
//   console.log(req.query)
//   let sql = `UPDATE mona
//           SET mona_descr = ?, 
//           mona_value = ?, 
//           mona_user_id = ?, 
//           mona_creation_date = ?, 
//           mona_state_code = ?
//           WHERE mona_id = ?}` // TENGO QUE PONER EL  ---------WHERE mona_id 4{req.params.id}----- para que ande por postman
  
//   let params = [
//           req.query.descr, 
//           req.query.value, 
//           req.query.idUser, // tengo que poner req.query.idUser para que lo tome desde el postman
//           req.query.creationdate,  
//           req.query.statecode , 
//           req.params.id //el req.params.id por postman no es necesaro
//           ];
          
//   conexion.query(sql, params, function(err,result,fields){

//           let respuesta;

//           if (err){
//                   respuesta={
//                                   status: 'error',
//                                   message: 'Error al modificar el ingreso',
//                             }
//           }
//           else{
//                   respuesta= {
//                                   status: 'ok',
//                                   message: 'El ingreso se modificó',
//                             }
//           }
//           res.json(respuesta);
//           console.log(req.query)
//           console.log(err)

//   })


// })

router.put('/:id', (req, res)=>{

        console.log(req.body)
        console.log(req.params)
        console.log(req.session)
        console.log('entre mi reino')
        let sql = `UPDATE mona
                SET ?
                WHERE mona_id = ?`
        
        let params = [
                req.body, 
                req.params.id
                ];
        
        conexion.query(sql, params, function(err,result,fields){

                let respuesta;

                if (err){
                        respuesta={
                                status: 'error',
                                message: 'Error al modificar la mona',
                                err: err
                        }       
                }
                else{
                        respuesta= {
                                        status: 'ok',
                                        message: 'la mona se agregó',
                                  }
                }
                res.json(respuesta);

        })


})
*/

module.exports = router; 