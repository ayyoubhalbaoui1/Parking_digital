const { Student } = require('../models')
const { QueryTypes,Sequelize } = require('sequelize');

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

const getAll = async (req, res) => {
    try {
        const students = await Student.findAll()
        res.json(students)
    } catch (error) {
        console.log(error)
    }
}

// find by fullname & cin : 
const getStudentByCin = async (req, res) => {
    try {
        const student = await Student.findOne({
            where : {
                fullname : req.body.fullname,
                cin : req.body.cin
            }
        })
        if(student) {
            res.json(student)
        } else {
            res.json({message : "Student Not Found !!!"})
        }
    } catch (error) {
        res.json(error)
    }
}

const addStudent = async (req, res) => {
    try {
        const student = await Student.create({
            id_student : req.body.id_student,
            fullname : req.body.fullname,
            phone : req.body.phone,
            cin : req.body.cin,
            is_valid : req.body.is_valid
        })
        res.json(student)
    } catch (err) {
        res.json(err)
    }
}

const editStudent = async (req, res) => {
    try {
        if(!req.body){
            return res.send({message : "they is not data !!!"})
        }
        const idStudent = req.params.id
        const st = await Student.update(req.body, {
            where: { id: idStudent }
        })
        if(st) {
            const updatedPost = await Student.findOne({ where: { id: idStudent } });
            return res.status(200).json({ is_valid : updatedPost });
        }
    } catch (error) {
        res.json(error)
    }
}

const deleteStudent = async (req, res) => {
    var id = req.params.id
    await Student.destroy({
        where : {id : req.params.id}
    }).then(() => {
        res.json({msg : "Deleted"})
    })
}

module.exports = {
    getStudent,
    addStudent,
    getAll,
    deleteStudent,
    editStudent,
    getStudentByCin
}