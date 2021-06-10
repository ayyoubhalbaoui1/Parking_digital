module.exports = (sequelize,DataTypes) => {

    const Student = sequelize.define('Student',{


        fullname: {
            type : DataTypes.STRING,
        },
        phone: {
            type : DataTypes.STRING,
        },
        cin: {
            type : DataTypes.STRING,
        }


    });

    return Student;

}