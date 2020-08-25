const mysql = require('mysql');
const config = require('../config/config.dev');

const pool = mysql.createPool(config.dbConnection);

exports.query = async () => {
    let connection = await pool.getConnection();
    return connection;
}


// exports.query = (sql, values) => 
//       new Promise((resolve, reject) => {
//           pool.getConnection((err, connection) => {
//               if (err) {
//                   console.log('query conncet error', err);
//               } else {
//                   connection.query(sql, values, (err, rows) => {
//                       if(err) {
//                           reject(err);
//                       } else {
//                           resolve(rows);
//                       }
//                       connection.release();
//                   })
//               }
//           })
//       })