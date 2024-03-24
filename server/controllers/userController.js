const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { createToken } = require('../middlewares/utils');
require('dotenv').config()


exports.signup = async (req, res) => {
    try {
        const { role, name, email, password } = req.body;

        if (role === "Customer" || role === "Restaurant") {
            let roleId;

            // Assign roleId based on different role
            switch (role) {
                case "Customer":
                    roleId = 1;
                    break;
                case "Restaurant":
                    roleId = 2;
                    break;
                default:
                    roleId = 0;
            }

            const user = await User.create({ roleId, name, email, password });
            res.status(201).json({ user: { _id: user._id, roleId: user.roleId, name: user.name, email: user.email } });
        } else {
            res.status(400).json({ error: 'Please provide a correct user role' });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);

        // Create and save token in cookie after successful login
        const token = createToken(user._id, user.roleId);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

        res.status(200).json({ user: { _id: user._id, roleId: user.roleId, name: user.name, email: user.email } });
    } catch (error) {
        if (error.message === 'Incorrect password') {
            statusCode = 400;
        } else if (error.message === 'Email not found') {
            statusCode = 404;
        }
        res.status(statusCode).json({ error: error.message });
    }
};

exports.customerBoard = (req, res) => {
    res.json('Customer Dashboard')
};

exports.restaurantBoard = (req, res) => {
    res.json('Restaurant Dashboard')
}