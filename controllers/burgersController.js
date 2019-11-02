var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");


router.get("/api/burger", function (req, res) {
  burger.selectAll(function (result) {
    res.json(result);
  });
});
router.get("/api/burger/names", function (req, res) {
  burger.uniqueBurgers(function (result) {
    res.json(result);
  });
});



router.post("/api/burger", function (req, res) {
  burger.insertOne(req.body.name, function (result) {
    res.json(result);
  });
});

router.put("/api/burger", function (req, res) {
  burger.updateOne(req.body.id, function (result) {
    res.send(result);
  });
});


module.exports = router;
