const express = require('express');
const conexion = require('../connection')
const router = express.Router();



router.get('/', (req, res)=>{                                    //MONA
    
    conexion.query('SELECT * FROM mona WHERE mona_state_code = 1', function(err,result,fields){
        if (err) throw err;

        console.log(result)

        res.send(result)
    })  
});


router.get('/:id', (req, res) => {
    
  conexion.query('SELECT * FROM mona WHERE mona_id=' + req.params.id,
                  function (err, result, fields){
                      if ( err ) throw err;

                      res.json(result[0]); //esta con el [0], asi te devuelve el OBJETO de la array y no la array completa
                  }
              )

} );

//////////////////////////////////POST - ANDA POR QUERY CON POSTMAN /////////////////////////////////////////////
router.post('/', (req, res)=>{
  console.log(req.body)
          //¿EL NUMERO DE ID IRIA EN PARAMETROS? ejemplo {params.id}      
  let sql = `INSERT INTO mona (mona_descr, mona_value, mona_user_id, mona_creation_date, mona_state_code) 
              VALUES (?, ?, ?, ?, ?)`
  
  let params = [
          req.body.descr, 
          req.body.value, 
          req.body.idUser = 1,  // solucionado (parametros aclarados en session_routes.js )
          req.body.creationdate = '2020-04-05T06:00:00.000Z',  
          req.body.statecode = 1 //TENGO QUE METER ESTA OPCION SI O SI 
          ];
         
          conexion.query(sql, params, function(err,result,fields){
                let respuesta;
  
                if (err){
                  console.log(err)
  
                  respuesta ={
                                  status: 'error',
                                  message: 'Error al guardar Mona/ingreso'
                             }
                }
                else{
                        respuesta = {
                                          status: 'ok',
                                          message: 'La Mona/ingreso se guardo satisfactoreamente'
                                    }
                }
                res.json(respuesta);
          })
  
  });
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


module.exports = router; 