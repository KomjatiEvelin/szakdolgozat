const db = require("../model");
const config = require("../config/auth_config");
const User = db.user;
const Password = db.password;
const Result=db.result;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {

    User.create({
        username: req.body.username,
        email: req.body.email,
        class:req.body.classnum,

    }).then(() => {
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then((User) =>{
            Password.create({
                user_id:User.id,
                passwd: bcrypt.hashSync(req.body.password,2),
            }).then(res.send({ message: "User was registered successfully!" })).catch(err => {
                res.status(500).send({ message: err.message });});
        }).catch(err => {
            res.status(500).send({ message: err.message });});

    }).catch(err => {
            res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function (User) {
            if (!User) {
                return res.status(404).send({ message: "User Not found." });
            }
            Password.findOne({
                where:{
                    user_id:User.id
                }
            }).then(function (Password){
                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    Password.passwd
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
                let token = jwt.sign({ id: User.id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });

                    res.status(200).send({
                        id: User.id,
                        email: User.email,
                        class:User.class,
                        username: User.username,
                        accessToken: token
                    });
                });
            }).catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateUser = (req, res) => {

    if(req.body.email.length>5){
        User.update({ email: req.body.email}, {where: {username:req.body.username}})
    }
    if(req.body.passwd.length>5){
        User.update({ passwd: req.body.passwd}, {where: {username:req.body.username}})
    }
    if(req.body.classnum>0){
        User.update({ class: req.body.classnum}, {where: {username:req.body.username}})
    }

    User.findOne({
            where: {
                username: req.body.username
            }}).then(function (User){
                res.status(200).send({
                    id: User.id,
                    email: User.email,
                    class:User.class,
                    username: User.username,
                    accessToken:  req.headers["x-access-token"],
                    message: "Successfully updated!"
                });
            }
        ).catch(err => {
            res.status(500).send({ message: err.message });
        })

};

exports.getUsersResults=(req,res)=>{
    Result.findAll(
        {where: {user_id: req.query.userid}})
        .then(Result=>{
           res.status(200).send(res.json(Result));
           console.log(res.json(Result));
        })
        .catch(err => {
        res.status(500).send({message: err.message});
        });

}
