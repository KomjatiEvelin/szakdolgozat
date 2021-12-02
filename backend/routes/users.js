const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sha1 = require('sha1');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"szakdolgozat"
});


router.get("/", function(req, res, next) {

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql="select * from user";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send("API is working properly"+ result);
    });
  });
});

mysql.format()
router.post('/register', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    let sql="insert into user(email,class,username) values ?"
    con.query(sql,[req.body.email,req.body.class,req.body.userName], function (error, results, fields) {
      if (error) throw error;
    });

    sql="insert into passwords(user_id,passwd) values((select id from user where username=?), ?)"
    con.query(sql,[req.body.userName,sha1(req.body.passwd)], function (error, results, fields) {
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

router.get('/edit', function(req, res, next) {
  let sql="'update members set class = ?, email =?  where username =?";
  res.locals.connection.query(sql,[req.body.class,req.body.email,req.body.userName], function (error, results, fields) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});
module.exports = router;
