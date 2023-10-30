const jwt = require('jsonwebtoken');
const { env } = require("../configs");
const jsSen = env.jsn;

class JwtService {
    // Sign a JWT token
    static async signToken(payload) {
        try {
            const token = jwt.sign(payload, jsSen, { expiresIn: '1h' });
            return token;
        } catch (error) {
            throw new Error(`Error signing JWT token: ${error.message}`);
        }
    }

    // Decode a JWT token
    static async decodeToken(token) {
        try {
            const decodedToken = jwt.verify(token, jsSen);
            return decodedToken;
        } catch (error) {
            throw new Error(`Error decoding JWT token: ${error.message}`)
        }
    }
}

module.exports = JwtService;
