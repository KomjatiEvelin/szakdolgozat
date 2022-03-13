const db = require("../model");
const Material=db.material;
const { Op } = require("sequelize");

exports.learningMaterials = (req, res) => {
    res.status(200).send("Here comes the materials");
};
