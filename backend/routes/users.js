var express = require('express');
var router = express.Router();
var mysql = require('mysql');
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
    con.query('insert into user(id,email,class,username) values(2,' + '\''+req.body.email + '\''+ ',' + req.body.class + ',' + '\''+ req.body.userName + '\''+')', function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  });
});

module.exports = router;
