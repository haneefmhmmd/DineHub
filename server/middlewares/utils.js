const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();


// Create token with userId and roleId
const createToken = (id, roleId) => {
    return jwt.sign({ id, roleId }, process.env.JWT_SECRET, { expiresIn: 3 * 24 * 60 * 60 });
}

// Validate token
const requireAuth = (roleIds) => (req, res, next) => {

    // Retrieve token from either header or cookies
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization;
    }
    else {
        token = req.cookies.token
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }
            else {
                if (!roleIds.includes(decodedToken.roleId)) {
                    return res.status(403).json({ error: 'Forbidden: Insufficient role level' });
                } else {
                    req.loginId = decodedToken.id;
                    next();
                }
            }
        })
    }
    else {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
}

module.exports = { createToken, requireAuth }