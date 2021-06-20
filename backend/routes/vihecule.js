const router = require('express').Router()

const ViheculeController = require('../controllers/ViheculeController')

router.post("/addVih", ViheculeController.addVih)
router.patch("/getPlace/:id", ViheculeController.calc)
router.get("/all", ViheculeController.all)
router.delete("/delete/:id", ViheculeController.deleteVih)

module.exports = router