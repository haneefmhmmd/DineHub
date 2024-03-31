const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middlewares/utils');

// Routes for user CRUD
router.post('/users/signup', userController.signup);
router.post('/users/login', userController.login);
router.get('/customerBoard', requireAuth([1]), userController.customerBoard);
router.put('/users/update/:id', userController.update);

module.exports = router