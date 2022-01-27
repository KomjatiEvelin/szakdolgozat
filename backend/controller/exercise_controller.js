const db = require("../model");
const Exercise=db.exercise;
const Result=db.result;
const { Op } = require("sequelize");

exports.showExercises = (req, res) => {
   Exercise.findAll(
        {where: {class: {[Op.lte]: req.query.classnum}}})
        .then(Res=>{
            res.status(200).send(res.json(Res));
            console.log(res.json(Res));
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.saveScore=(req,res)=>{
   Result.create({
        user_id: req.body.userid,
        excercise_id: req.body.gameid,
        point:req.body.score,
        time:Date.now(),

    }).then(Res=>{
       res.status(200).send({message:"success"});
       console.log(res.json(Res));
   })
       .catch(err => {
           res.status(500).send({message: err.message});
           console.log(err.message);
       });
}
