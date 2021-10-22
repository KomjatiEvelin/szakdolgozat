var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sha1 = require('sha1');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"szakdolgozat"
});


router.get("/", function(req, res, next) {

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("select * from user", function (err, result) {
      if (err) throw err;
      res.send("API is working properly"+ result);
    });
  });
});

router.post('/register', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    con.query('insert into user(email,class,username) values(' + '\''+req.body.email + '\''+ ',' + req.body.class + ',' + '\''+ req.body.userName + '\''+')', function (error, results, fields) {
      if (error) throw error;
    });
    con.query('insert into passwords(user_id,passwd) values((select id from user where username=\''+req.body.userName+'\'),\''+sha1(req.body.passwd)+'\')', function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  });
});

router.post('/login', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    con.query('', function (error, results, fields) { //TODO select-et megírni
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  });
});
module.exports = router;
