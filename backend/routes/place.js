const router = require('express').Router()

const placeController = require('../controllers/PlaceController')

router.post("/addPlace", placeController.creatPlaces)
router.get("/getPlace", placeController.getPlaces)
// router.post("/add", studentController.addStudent)

module.exports = router