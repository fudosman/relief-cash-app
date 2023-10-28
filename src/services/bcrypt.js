const bcrypt = require('bcrypt');
const { env } = require("../configs");
const stRounds = Number(env.ssnRounds);

exports.hashPassword = async (unhashedPassword) => {
    const hash = await bcrypt.hash(unhashedPassword, stRounds);
    return hash;
};

exports.verifyPassword = async (password, hash) => {
    const isValidPassword = await bcrypt.compare(password, hash);
    return isValidPassword;
}