const handler = require("./handler.error");
const error404 = require("./404.error");
const homePageError = require("./home.error");

module.exports = {
  handler,
  error404,
  homePageError
};
