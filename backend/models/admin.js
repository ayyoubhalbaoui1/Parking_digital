module.exports = (sequelize,DataTypes) => {

    const Admin = sequelize.define('Admin', {

        email: {
            type : DataTypes.STRING,
        },
        password: {
            type : DataTypes.STRING,
        }

    });

    return Admin;

}