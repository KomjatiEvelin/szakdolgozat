const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sha1 = require('sha1');
const jwt=require('jsonwebtoken');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"szakdolgozat"
});
