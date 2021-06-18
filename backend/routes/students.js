const express = require('express')
const router = express.Router()

const studentController = require('../controllers/students.controller')

router.get("/one/:id", studentController.getStudent)
router.post("/add", studentController.addStudent)
router.get("/all", studentController.getAll)
router.delete("/delete/:id", studentController.deleteStudent)
router.patch("/edit/:id", studentController.editStudent)
router.get("/findStudent", studentController.getStudentByCin)

module.exports = router