module.exports = (sequelize, Sequelize) => {
    const Exercise= sequelize.define("exercise", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        theme: {
            type: Sequelize.STRING
        },
        class:{
            type: Sequelize.INTEGER
        },
        name:{
            type: Sequelize.STRING
        },
        link:{
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });

    return Exercise;
};