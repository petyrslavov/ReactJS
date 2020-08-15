const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/cars', feedController.getCars);
router.post('/car/create', feedController.createCar);
router.post('/rent/create', feedController.createRent);
router.post('/edit/:id', feedController.editPost);
router.post('/delete/:id', feedController.deletePost);

module.exports = router;