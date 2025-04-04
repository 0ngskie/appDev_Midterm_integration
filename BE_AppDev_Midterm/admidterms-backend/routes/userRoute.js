const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Basic GET Route for Accounts
router.get('/', userController.getAllUsers);

router.get('/getUser/:user_id', userController.getUser);
router.get('/getClients/:agent_id', userController.getClients);
router.post('/createUser', userController.createUser);
router.put('/updateUser/:user_id', userController.updateUser);
router.put("/updatePassword/:user_id", userController.updatePassword);
router.delete('/deleteUser/:user_id', userController.deleteUser);
router.get('/login', userController.login);

module.exports = router;