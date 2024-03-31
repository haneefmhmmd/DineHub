const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Routes for menu CRUD
router.post('/menus', menuController.create);
router.get('/menus/:id', menuController.findOne);
router.put('/menus/:id', menuController.update);
router.delete('/menus/:id', menuController.delete);

module.exports = router