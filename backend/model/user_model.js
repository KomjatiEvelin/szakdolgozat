module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        email: {
            type: Sequelize.STRING
        },
        class:{
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });

    return User;
};