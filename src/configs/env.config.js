require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    firstName: process.env.FIRST_NAME,
    lastName: process.env.LAST_NAME,
    town: process.env.TOWN,
    population: process.env.POPULATION,
    dbUrl: process.env.MONGO_URL,
    ssnRounds: process.env.SALT_ROUNDS,
    jsn: process.env.JWT_SECRET_KEY
}