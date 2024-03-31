const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { createToken } = require('../middlewares/utils');
require('dotenv').config()


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password });
        res.status(201).json({ user: { _id: user._id, roleId: user.roleId, name: user.name, email: user.email } });

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

exports.customerBoard = async (req, res) => {
    const user = await User.findById(req.loginId)
    res.json(user);
};

exports.update = (req, res) => {
    let userId;
    if (req.loginId) {
        userId = req.loginId;
    }
    else {
        userId = req.params.id;
    }

    User.findByIdAndUpdate(userId, req.body, { new: true, useFindAndModify: false })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({
                    message: `Cannot update user with id=${userId}. User not found.`
                });
            }
            res.status(200).json({
                message: "User was updated successfully.",
                user: updatedUser
            });
        })
        .catch(err => {
            console.error("Error updating user:", err);
            res.status(500).json({
                message: `Error updating user with id=${userId}.`
            });
        });
};
