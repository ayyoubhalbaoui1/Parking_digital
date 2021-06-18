const express = require('express')
const router = express.Router()

const adminController = require('../controllers/admins.controller')

router.get("/allAdmins", adminController.getAll)
router.post("/addAdmin", adminController.addAdmin)


module.exports = router