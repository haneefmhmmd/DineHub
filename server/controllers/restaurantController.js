const Restaurant = require('../models/restaurant');
const jwt = require('jsonwebtoken');
const { createToken } = require('../middlewares/utils');
require('dotenv').config()


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const restaurant = await Restaurant.create({ name, email, password });
        res.status(201).json({ restaurant: { _id: restaurant._id, roleId: restaurant.roleId, name: restaurant.name, email: restaurant.email } });

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const restaurant = await Restaurant.login(email, password);

        // Create and save token in cookie after successful login
        const token = createToken(restaurant._id, restaurant.roleId);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

        res.status(200).json({ restaurant: { _id: restaurant._id, roleId: restaurant.roleId, name: restaurant.name, email: restaurant.email } });
    } catch (error) {
        if (error.message === 'Incorrect password') {
            statusCode = 400;
        } else if (error.message === 'Email not found') {
            statusCode = 404;
        }
        res.status(statusCode).json({ error: error.message });
    }
};

exports.restaurantBoard = async (req, res) => {
    const restaurant = await Restaurant.findById(req.loginId)
    res.json(restaurant);
};

exports.update = (req, res) => {
    let restaurantId;
    if (req.loginId) {
        restaurantId = req.loginId;
    }
    else {
        restaurantId = req.params.id;
    }

    Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true, useFindAndModify: false })
        .then(updatedRestaurant => {
            if (!updatedRestaurant) {
                return res.status(404).json({
                    message: `Cannot update restaurant with id=${restaurantId}. Restaurant not found.`
                });
            }
            res.status(200).json({
                message: "Restaurant was updated successfully.",
                restaurant: updatedRestaurant
            });
        })
        .catch(err => {
            console.error("Error updating restaurant:", err);
            res.status(500).json({
                message: `Error updating restaurant with id=${restaurantId}.`
            });
        });
};