const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require("../configs").env;
const { User } = require('../models');

class JwtService {
    // Sign a JWT token
    static async signToken(payload) {
        try {
            const token = jwt.sign(payload, jwtPrivateKey, { expiresIn: '1h' });
            return token;
        } catch (error) {
            throw new Error(`Error signing JWT token: ${error.message}`);
        }
    }

    // Decode a JWT token
    static async decodeToken(token) {
        try {
            const decodedToken = await jwt.verify(token, jwtPrivateKey);
            return decodedToken;
        } catch (error) {
            throw new Error(`Error decoding JWT token: ${error.message}`)
        }
    }

    static async protectRoute(req, res, next) {
        try {
            const token = req.headers.authorization
                ? req.headers.authorization.split(" ")[1]
                : null;
            if (token == null) {
                return res.status(400).json({ message: "No Token Provided!" });
            }
            // decode the token
            const decoded = jwt.verify(token, jwtPrivateKey);

            // check if the user exists
            const user = await User.findById(decoded.user._id);
            if (!user) {
                return res.status(401).json({
                    error: "User Not Found",
                });
            }
            console.log(user.firstName + " is successfully authenticated");
            // add the user to the request
            req.user = user;
            // call the next middleware
            next();
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: error.message
            })
        }
    }

    static async isAdmin(req, res, next) {
        try {
            const role = req.user.role;
            if (role === 'Admin') {
                next();
            } else if (role === 'Customer') {
                return res.status(403).json({
                    success: false,
                    message: `Not Allowed, you are a customer`
                });
            } else if (role === 'Merchant') {
                return res.status(403).json({
                    success: false,
                    message: `Not Allowed, you are a merchant`
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: `Permission denied`
                });
            }
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: `Not An Admin: ${error.message}`
            });
        }
    }
}

module.exports = JwtService;
