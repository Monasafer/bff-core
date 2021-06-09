const express = require('express');
const conexion = require('../connection.js');
const router = express.Router();

router.get('/dashboard', (req, res) => {
                let user_id =  req.headers['user-id'];
                let totalDaily = 0;               
                let totalWeekly = 0;               
                let fsi = 0;
                let totalSave   = 0 ;
                let totalExpend = 0 ;
                let totalMona   = 0 ;

                //TODO : Cada una de estas queries deberia ser para un periodo de tiempo que se envie por parametro.
                querySave  =    'SELECT * FROM save WHERE state_code = 1 AND user_id=?';
                queryExpen =    'SELECT * FROM expend WHERE state_code = 1 AND user_id=?';
                queryMona  =    'SELECT * FROM mona WHERE state_code = 1 AND user_id=?';
                querySpecialExpend  =    'SELECT * FROM special_expend WHERE state_code = 1 AND user_id=?';
                
                conexion.query  (querySave, user_id,
                                function (err, result){
                                        if ( err ) throw err;
                                        result.forEach(save => {
                                                totalSave = totalSave + save.value;
                                        });

                                conexion.query(queryExpen, user_id,
                                                function (err, result){
                                                        if ( err ) throw err;
                                                        result.forEach(expend => {
                                                                totalExpend = totalExpend + expend.value;
                                                });

                                        conexion.query(queryMona, user_id,
                                                        function (err, result){
                                                                if ( err ) throw err;
                                                                result.forEach(mona => {
                                                                        totalMona = totalMona + mona.value;
                                                        });

                                                        conexion.query(querySpecialExpend, user_id,
                                                                function (err, result){
                                                                        if ( err ) throw err;
                                                                        result.forEach(specialExpend => {
                                                                                if(specialExpend.descr == "daily"){totalDaily = specialExpend.value * 30;}
                                                                                if(specialExpend.descr == "weekly"){totalWeekly = specialExpend.value * 5;}
                                                                                if(specialExpend.descr == "fsi"){fsi = specialExpend.value;}          
                                                                });
        
                                                                let total = 
                                                                {   
                                                                        totalExpend : totalExpend,
                                                                        totalSave : totalSave,
                                                                        totalMona : totalMona,
                                                                        totalDaily : totalDaily,
                                                                        totalWeekly : totalWeekly,
                                                                        fsi: fsi,
                                                                        balance  : totalMona - totalExpend - totalSave - totalDaily - totalWeekly - fsi
                                                                        }
                                                                res.json(total);
                                                                });   
                                                        });            
                                                });
                                });
});

module.exports = router;