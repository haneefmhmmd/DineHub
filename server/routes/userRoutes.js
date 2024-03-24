const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middlewares/utils');

// Routes for user CRUD
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/customerBoard', requireAuth([1]), userController.customerBoard);
router.get('/restaurantBoard', requireAuth([2]), userController.restaurantBoard);

module.exports = router