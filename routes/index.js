var express = require("express");
var router = express.Router();
var async = require("async");
var execQuery = require("./db.js");
var renderIndex = require("./render.js");

async function mainFlow(res, year, month) {
  var work_list = [];
  var done_list = [];
  var queryWorks = "SELECT * FROM works";
  var queryDones =
    "select * from dones where year='" + year + "' and month='" + month + "'";

  await execQuery(queryWorks, work_list);
  await execQuery(queryDones, done_list);

  renderIndex(res, year, month, work_list, done_list);
}

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("=============================");
  console.log("index get");
  var date = new Date();
  mainFlow(res, date.getFullYear(), date.getMonth() + 1);
});

router.post("/", function(req, res, next) {
  console.log("=============================");
  console.log("index post");
  mainFlow(res, req.body.year, req.body.month);
});

module.exports = router;
