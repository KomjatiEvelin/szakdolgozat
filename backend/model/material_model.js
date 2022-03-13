module.exports = (sequelize, Sequelize) => {
    const Material= sequelize.define("material", {

        name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        class:{
            type: Sequelize.INTEGER
        },
        content:{
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });

    return Material;
};
