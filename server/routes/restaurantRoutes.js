const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { requireAuth } = require('../middlewares/utils');

// Routes for user CRUD
router.post('/restaurants/signup', restaurantController.signup);
router.post('/restaurants/login', restaurantController.login);
router.get('/restaurantBoard', requireAuth([2]), restaurantController.restaurantBoard);
router.put('/restaurants/update/:id', restaurantController.update);

module.exports = router