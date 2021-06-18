const db = require('../models')

const creatPlaces = async (req, res) => {
    try {
        const createPlace = await db.Place.create({
            stat : req.body.stat
        })
        res.status(201).json(createPlace)
    } catch (error) {
        res.json(error)
    }
}

const editPlace = async (req, res) => {
    const id = req.params.id
    try {
        const edited = await db.Place.update({
            stat : req.body.stat
        } , {
            where : {id : id}
        })
        res.json(edited)
    } catch (error) {
        res.json({message : error.message})
    }
}

const getPlaces = async (req, res) => {
    //console.log(123);
    try {
        const places = await db.Place.findAll()
        res.status(201).json(places)
    } catch (error) {
        res.json(error)
    }
}



  
module.exports = {
    creatPlaces,
    getPlaces,
    editPlace
}