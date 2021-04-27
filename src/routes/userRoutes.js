const express = require('express');
const conexion = require('../connection')

const router = express.Router();


router.get('/', (req, res)=>{                                    //USUARIOS                                    
                                 
                                    conexion.query('SELECT * FROM user', function(err,result,fields){
                                        if (err) throw err;
  
                                        console.log(result)
                                    })
                                    res.send('listado usuarios monadb')
                                    } 
                                   
        );
  


  module.exports = router;