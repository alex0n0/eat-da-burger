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


