const mysql = require('mysql');
let conexion = mysql.createConnection(
    {
        host: 'us-cdbr-east-03.cleardb.com',
        user: 'bc74c327788e47',
        password: '8dcf085d',
        database: 'heroku_b667af063c5f73a'
    }
);
conexion.connect( 
                    function(err)
                        {
                            
                            if( err ) throw err; //si hay error , se va de la función.
                            
                            console.log("conectado con exito!");

                        }
                );

                
module.exports = conexion;