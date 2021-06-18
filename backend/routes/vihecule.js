const router = require('express').Router()

const ViheculeController = require('../controllers/ViheculeController')

router.post("/addVih", ViheculeController.addVih)
router.patch("/getPlace/:id", ViheculeController.calc)
router.get("/all", ViheculeController.all)
// router.post("/add", studentController.addStudent)

module.exports = router