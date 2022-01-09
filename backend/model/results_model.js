module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("result", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        user_id: {
            type: Sequelize.INTEGER
        },
        excercise_id:{
            type: Sequelize.INTEGER
        },
        point:{
            type: Sequelize.INTEGER
        },
        time:{
            type: Sequelize.DATE
        }
    },{
        timestamps: false
    });

    return Result;
};