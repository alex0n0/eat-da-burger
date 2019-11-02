// var mysql = require("mysql");
// var keys = require('./keys.js');

// var connection = mysql.createConnection({
//   host: keys.DB_HOST,
//   port: 3306,
//   user: keys.DB_USER,
//   password: keys.DB_PASSWORD,
//   database: keys.DB_DATABASE
// });

// // Make connection.
// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// // Export connection for our ORM to use.
// module.exports = connection;


var mysql = require("mysql");
var keys = require('./keys.js');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: keys.DB_HOST,
  port: 3306,
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
  database: keys.DB_DATABASE
});

module.exports = pool;


