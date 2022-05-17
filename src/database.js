const mysql = require('mysql');
const {promisify} = require('util');

//var db_config = {
//  host: process.env.DATABASE_HOST,
//  user: process.env.DATABASE_USER,
//  password: process.env.DATABASE_PASSWORD,
//  database: process.env.DATABASE_NAME
//};

//PROD
var db_config = {
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'ba46bc2da80b73',
  password: 'd43a9c88f2f5daf',
  database: 'heroku_8a551bcfa4d3d31'
  //PORT 3306
};

const pool = mysql.createPool(db_config);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  if (connection) connection.release();
  console.log("DataBase is Connected");

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports=pool