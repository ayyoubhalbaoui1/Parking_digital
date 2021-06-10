const express = require('express')
const router = express.Router()

const studentController = require('../controllers/students.controller')

router.get("/all/:id", studentController.getStudent)
router.post("/add", studentController.addStudent)

module.exports = router