const db = require("../model");
const Exercise=db.exercise;


exports.showExercises = (req, res) => {
   Exercise.findAll(
        {where: {class: req.query.classnum}})
        .then(Result=>{
            res.status(200).send(res.json(Result));
            console.log(res.json(Result));
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};