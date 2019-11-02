var pool = require("../config/connection.js");
var moment = require('moment');

var orm = {
  selectAll: function (cb) {
    pool.query("SELECT * FROM Burgers ORDER BY updated_at DESC", function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function (val, cb) {
    pool.query("INSERT INTO Burgers (burger_name) VALUES (?)", val, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: function (id, cb) {
    pool.query("UPDATE Burgers SET ? WHERE id = ?", [
      { devoured: true, updated_at: moment().format('YYYY-MM-DD HH:mm:ss') },
      id
    ], function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  uniqueBurgers: function (cb) {
    pool.query("SELECT DISTINCT burger_name FROM Burgers", function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};


module.exports = orm;
