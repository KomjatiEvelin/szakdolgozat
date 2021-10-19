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
        console.log("Result: " + result);
    });
});