const { Student } = require('../models')
const { QueryTypes,Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models')

const getStudent = async (req, res) => {
    const id = req.params.id
    try {
      const data=  await Student.findOne({where : {id}})
    // const data = await db.Sequelize()
      console.log(data)
res.status(201).json(data)
    } catch (error) {
        res.json(error)
    }
}

const addStudent = async (req, res) => {
    try {
        const student = await Student.create({
            id_student : req.body.id_student,
            fullname : req.body.full_name,
            phone : req.body.phone,
            cin : req.body.cin
        })
        res.json(student)
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    getStudent,
    addStudent
}