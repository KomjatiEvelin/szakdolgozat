var express = require('express');
var router = express.Router();


router.get("/", function(req, res, next) {
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database:"szakdolgozat"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("select*from user", function (err, result) {
            if (err) throw err;
            res.send("API is working properly"+ result);
        });
    });



});

module.exports = router;