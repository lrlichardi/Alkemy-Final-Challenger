const express = require('express');
const router = express.Router();
const {newUserValidation} = require('../validations/userValidation');
const {newUser , getUser} = require('../controllers/users');

router.post('/register' , newUserValidation , newUser);
router.post('/login' , getUser);


module.exports = router;