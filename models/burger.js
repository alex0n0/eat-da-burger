var orm = require("../config/orm.js");

var burger = {
  selectAll: function(cb) {
    orm.selectAll(function (result) {
      cb(result);
    });
  },
  insertOne: function(val, cb) {
    orm.insertOne(val, function (result) {
      cb(result);
    });
  },
  updateOne: function(id, cb) {
    orm.updateOne(id, function (result) {
      cb(result);
    });
  },
  uniqueBurgers: function(cb) {
    orm.uniqueBurgers(function (result) {
      cb(result);
    });
  }
};

module.exports = burger;
