const express = require('express');
const conexion = require('../connection.js');
const { route } = require('./userRoutes.js');
const router = express.Router();

router.get('/dash', (req, res) => {
        let   user_id =  req.headers['user-id'];
        let balance;
        let totalSave   = 0 ;
        let totalExpend = 0 ;
        let totalMona   = 0 ;
        querySave  =    'SELECT * FROM save WHERE save_state_code = 1 AND save_user_id=?';
        queryExpen =    'SELECT * FROM expend WHERE expen_state_code = 1 AND expen_user_id=?';
        queryMona  =    'SELECT * FROM mona WHERE mona_state_code = 1 AND mona_user_id=?';
               
        conexion.query  (querySave, user_id,
                        function (err, result, fields){
                                if ( err ) throw err;
                                result.forEach(element => {
                                        totalSave = totalSave + element.save_value;
                        });
        conexion.query(queryExpen, user_id,
                        function (err, result, fields){
                                if ( err ) throw err;
                                result.forEach(element => {
                                        totalExpend = totalExpend + element.expen_value;
                        });
        conexion.query(queryMona, user_id,
                        function (err, result, fields){
                                if ( err ) throw err;
                                result.forEach(element => {
                                        totalMona = totalMona + element.mona_value;
                        });
        let total = {   totalE : totalExpend,
                        totalS : totalSave,
                        totalM : totalMona,
                        balance  : balance
                    }
                        balance = totalMona - totalExpend;
                        total.totalE = totalExpend;
                        total.totalS = totalSave;
                        total.totalM = totalMona;
                        total.balance = balance;
                        res.json(total);
                                        });            
                                }
                        );
                });
});

//Exportacion de ruta
module.exports = router;