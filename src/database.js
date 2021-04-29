const mysql = require('mysql');
const {promisify} = require('util');

var db_config = {
  host: 'us-cdbr-east-03.cleardb.com',
  user: 'bc74c327788e47',
  password: '8dcf085d',
  database: 'heroku_b667af063c5f73a'
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
  console.log("DB is Connected");

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports=pool