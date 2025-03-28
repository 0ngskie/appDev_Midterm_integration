const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Basic GET Route for Accounts
router.get('/', userController.getAllUsers);

router.get('/getUser/:user_id', userController.getUser);
router.post('/login', userController.login);
router.post('/createUser', userController.createUser);
router.put('/updateUser/:user_id', userController.updateUser);
router.put("/updatePassword/:user_id", userController.updatePassword);
router.delete('/deleteUser/:user_id', userController.deleteUser);

module.exports = router;