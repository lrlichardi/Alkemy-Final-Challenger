const express = require('express');
const router = express.Router();
const {getAccounts , newAccount , deleteAccount , getAccount, updateAccount} = require('../controllers/budgetPersonal');
const {newAccountValidation , editAccountValidation} = require('../validations/accountValidation')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/id=:id' , authMiddleware ,getAccounts);
router.post('/id=:id' , newAccountValidation , newAccount);
router.get('/account=:id' , getAccount);
router.put('/account=:id' ,editAccountValidation, updateAccount);
router.delete('/account=:id' , deleteAccount);


module.exports = router;