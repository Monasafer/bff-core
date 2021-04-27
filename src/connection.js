const mysql = require('mysql');
let conexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'monadb'
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