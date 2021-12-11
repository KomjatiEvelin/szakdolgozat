module.exports = (sequelize, Sequelize) => {
    const Password = sequelize.define("password", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        passwd: {
            type: Sequelize.STRING
        }
    },{
        timestamps: false
    });

    return Password;
};
