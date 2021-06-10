module.exports = (sequelize,DataTypes) => {

    const Vihecule = sequelize.define('Vihecule',{


        name: {
            type : DataTypes.STRING,
        },
        type: {
            type : DataTypes.STRING,
        }


    });

    Vihecule.associate=models=>{
        Vihecule.belongsTo(models.Place,{
            foreignKey:{
                allowNull:false
            }
        })
    };

    return Vihecule;

}