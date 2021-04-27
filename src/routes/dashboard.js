const express = require('express');
const conexion = require('../connection.js')
const router = express.Router();



router.get('/:id', (req, res) => {

        let todo;
        let totalSave = 0 ;
        let totalExpend = 0 ;
        let totalMona = 0 ;
               
        
        conexion.query('SELECT * FROM save WHERE save_state_code = 1 AND save_user_id=' + req.params.id,
                        function (err, result, fields){
                        if ( err ) throw err;
                        //console.log(result)


                        result.forEach(element => {
                                totalSave = totalSave + element.save_value;
                                //console.log(totalSave)
                                //console.log(element.save_value)
                        });
                        // res.json(result[0]); //esta con el [0], asi te devuelve el OBJETO de la array y no la array completa
                        
                
                        conexion.query('SELECT * FROM expend WHERE expen_state_code = 1 AND expen_user_id=' + req.params.id,
                                function (err, result, fields){
                                        if ( err ) throw err;
                                        //console.log(result)

                                

                                        result.forEach(element => {
                                                
                                                totalExpend = totalExpend + element.expen_value;
                                                //console.log(totalExpend)
                                                //console.log(element.expen_value)
                                        });
                                        conexion.query('SELECT * FROM mona WHERE mona_state_code = 1 AND mona_user_id=' + req.params.id,
                                        function (err, result, fields){
                                        if ( err ) throw err;
                                        //console.log(result)
                
                
                                        result.forEach(element => {
                                                totalMona = totalMona + element.mona_value;
                                                //console.log(totalMona)
                                                console.log('mona element value es ' + element.mona_value)
                                        });
                
                                        console.log('totalMona' + totalMona)
                                        let mes ={totalE : totalExpend,
                                                totalS : totalSave,
                                                totalM : totalMona}
                                        
                                        mes.totalE = totalExpend;
                                        mes.totalS = totalSave;
                                        mes.totalM = totalMona;
                                        res.json(mes)
                                        //res.json(result[0]); //esta con el [0], asi te devuelve el OBJETO de la array y no la array completa
                                        });            
                                        //console.log(totalExpend)
                                        //console.log(totalSave)
                                      
                                        //res.JSON.stringify(totalMona)
                                
                                }
                        );
                
                });




});


module.exports = router;