const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/cars', feedController.getCars);
router.post('/car/create', feedController.createCar);
router.get('/my-rents/:id', feedController.getUserRents);
router.post('/rent/create', feedController.createRent);
router.put('/edit/:id', feedController.editCar);
router.post('/delete/:id', feedController.deleteCar);

module.exports = router;