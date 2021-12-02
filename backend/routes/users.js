const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sha1 = require('sha1');
const jwt=require('jsonwebtoken');


router.get("/", function(req, res) {


  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"szakdolgozat"
  });

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


router.post('/register', function(req, res) {

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"szakdolgozat"
  });

  con.connect(function(err) {
    if (err) throw err;
    let sql="insert into user(email,class,username) values (?,?,?)"
    con.query(sql,[req.body.email,req.body.class,req.body.userName], function (error) {
      if (error) throw error;
    });

    sql="insert into passwords(user_id,passwd) values((select id from user where username=?), ?)"
    con.query(sql,[req.body.userName,sha1(req.body.passwd)], function (error, results) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  });
});

router.post('/login', function(req, res) {

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"szakdolgozat"
  });

  con.connect(function(err) {
    if (err) throw err;
    let sql="select user_id,passwd from passwords where user_id=(select id from user where username=?)"
    con.query(sql, [req.body.userName],function (error, results) {
      if (error) throw error;

      if(results[0].passwd!==sha1(req.body.passwd)){
         return( res.status(400).send({
               message: "Hibás adatok"
             }));}

      const token=jwt.sign({_id:results[0].user_id},"secret");

      res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:24*60*60*1000
      });

      return( res.status(200).send({
        message: "Success"
      }));
    });
  });
});

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {maxAge: 0})

  res.send({
    message: 'Success'
  })
})

router.get('/edit', function(req, res) {
  let sql="'update members set class = ?, email =?  where username =?";
  res.locals.connection.query(sql,[req.body.class,req.body.email,req.body.userName], function (error, results) {
    if(error) throw error;
    res.send(JSON.stringify(results));
  });
});
module.exports = router;
