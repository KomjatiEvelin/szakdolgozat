const config = require("../config/database_connection");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/user_model.js")(sequelize, Sequelize);
db.password = require("../model/auth_model.js")(sequelize, Sequelize);
db.result= require("../model/results_model.js")(sequelize, Sequelize);
db.exercise= require("../model/exercise_model.js")(sequelize, Sequelize);
db.material= require("../model/material_model")(sequelize, Sequelize);


module.exports = db;
