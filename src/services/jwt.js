const jwt = require('jsonwebtoken');
const { env } = require("../configs");
const jsSen = env.jsn;

exports.signToken = (payload) => {
    try {
        const token = jwt.sign(payload, jsSen, { expiresIn: '1h' });
        return token;
    } catch (error) {
        return false;
    }
}
exports.decodeToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, jsSen);
        return decodedToken;
    } catch (error) {
        return false;
    }
}