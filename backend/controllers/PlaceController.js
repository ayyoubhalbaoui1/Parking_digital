const db = require('../models')

const creatPlaces = async (req, res) => {
    try {
        const createPlace = await db.Place.create()
        // const data = await db.Sequelize()
        //   console.log(createPlace)
        res.status(201).json(createPlace)
    } catch (error) {
        res.json(error)
    }
}
const getPlaces = async (req, res) => {

    console.log(123);
    try {
        const places = await db.Place.findAll()
        res.status(201).json(places)
    } catch (error) {
        res.json(error)
    }
}




module.exports = {
    creatPlaces,
    getPlaces
}