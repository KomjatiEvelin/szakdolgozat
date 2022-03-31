const db = require("../model");
const Material=db.material;

exports.learningMaterials = (req, res) => {
   Material.findAll()
        .then(Res=>{
            res.status(200).send(res.json(Res));
            console.log(res.json(Res));
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

