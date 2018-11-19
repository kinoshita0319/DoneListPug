var express = require('express');
var async = require('async');
var router = express.Router();
var execQuery = require('./db.js');

router.post('/', async function(req, res, next) {
  console.log("work post");
  console.log(req.body);

  var queryWorks = "insert into works(work) values ('"+req.body.work+"')";
  await execQuery(queryWorks);

  res.redirect('/');
});

router.delete('/', async function(req, res, next) {
  console.log("work delete");
  console.log(req.body);

  var queryWorks = "delete works where work_id='"+req.body.work_id+"'";
  var queryDones = "delete dones where work_id='"+req.body.work_id+"'";
  
  await execQuery(queryWorks);
  await execQuery(queryDones);

  res.redirect('/');
});

module.exports = router;
