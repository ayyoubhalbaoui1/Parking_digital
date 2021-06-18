module.exports = (sequelize,DataTypes) => {

    const Place = sequelize.define('Place',{
        
        stat: {
            type : DataTypes.BOOLEAN,
        },

    });

    Place.associate=models =>{
        Place.hasOne(models.Vihecule)
    }

    return Place;

}