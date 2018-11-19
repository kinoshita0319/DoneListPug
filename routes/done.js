var express = require("express");
var async = require("async");
var router = express.Router();
var execQuery = require("./db.js");

router.post("/", async function(req, res, next) {
  console.log("=============================");
  console.log("done post");
  console.log(req.body);

  var query =
    "insert into dones(year, month, day, work_id) values ('" +
    req.body.year +
    "', '" +
    req.body.month +
    "', '" +
    req.body.day +
    "', '" +
    req.body.work_id +
    "')";
  await execQuery(query);

  res.redirect("/");
});

router.delete("/", async function(req, res, next) {
  console.log("=============================");
  console.log("done delete");
  console.log(req.body);

  var query =
    "delete dones where year='" +
    req.body.year +
    "' and month='" +
    req.body.month +
    "' and day='" +
    req.body.day +
    "' and work_id='" +
    req.body.work_id +
    "'";
  await execQuery(query);

  res.redirect("/");
});

module.exports = router;
