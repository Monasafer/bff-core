const express = require('express');
const router = express.Router();
const conexion = require('../connection')

router.post('/', (req, res) =>{

    let sql = `
                 SELECT *
                 FROM user
                 WHERE user = ?
                   AND pass = ?`;

    let values = [
                    req.body.user,
                    req.body.password 
                 ]

    conexion.query(sql, values, (err, result, fields) => {
        
        if ( err ) {
            res.json(
                {
                    status : 'error',
                    message : 'No es posible acceder en este momento. Intente nuevamente en unos minutos.'
                }
            )
        }else{
            
            if(result.length == 1){
                req.session.user   = req.body.user;
                req.session.user_id = result[0].user_id;

                res.json(
                    {
                        status     : 'ok',
                        message    : 'sesión iniciada',
                        loggedUser : {
                                        id     : req.session.user_id,
                                        nombre : result[0].user
                                     }
                    }
                )
            }
            else{
                res.json(
                    {
                        status  : 'error',
                        message : 'Usuario y/o contraseña no validos'
                    }
                );
            }

        }
    })



})

router.delete('/', (req, res) => {
    req.session.destroy( err =>{
        if ( err ){
            res.json(
                {
                    status : 'error',
                    message : 'Error al cerrar la sesión'
                }
            )
        }else{
            res.clearCookie('monadb');
            res.json(
                {
                    status  : 'ok',
                    message : 'Sesión cerrada'
                }
            )
        }
    })
})


module.exports = router;







// router.post('/', (req, res)=>{
//     console.log(req.session);

//     req.session.user = 'Pablo';
//     req.session.idUser = 1;

//     res.json({msg:'sesion iniciada'});
// })

// router.delete('/', (req, res)=>{
//     req.session.destroy(function(err){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.clearCookie('expend')
//             res.send({msg: 'Sesion cerrada'});
//         }
//     })
// })
