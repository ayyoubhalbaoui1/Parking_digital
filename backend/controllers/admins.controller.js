const { Admin } = require('../models')
const { QueryTypes,Sequelize } = require('sequelize');

const getAll = async (req, res) => {
    try {
        const ad = await Admin.findAll()
        res.json(ad)
    } catch (error) {
        console.log(error)
    }
}

const addAdmin = async (req, res) => {
    try {
        const ad = await Admin.create({
            id : req.id,
            email : req.body.email,
            password : req.body.password,
        })
        //console.log(ad)
        res.json(ad)
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    getAll,
    addAdmin
}