module.exports = (sequelize,DataTypes) => {

    const Place = sequelize.define('Place',{


        

    });

    Place.associate=models =>{
        Place.hasOne(models.Vihecule)
    }

    return Place;

}