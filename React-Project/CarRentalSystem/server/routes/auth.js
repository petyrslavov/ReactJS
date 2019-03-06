const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');

router.post('/signup', 
  [
    body('firstName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter a valid first name.'),
    body('lastName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter a valid last name.'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.'),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid username.')
  ]
, authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;
