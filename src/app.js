const express = require("express");
const asyncHandler = require('express-async-handler')
const { handler, error404 } = require('./errors');
const user = require('./routes/user.route');
const app = express();

//let us call some inbuilt express wares
app.use(
  express.json({
    limit: "100mb",
    extended: true,
  })
)

app.use(
  express.urlencoded({
    limit: "100mb",
    extended: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} request hit the route ${req.url}`);
  next();
});

// handlers
app.use("/api/users", asyncHandler(user));

app.use("*", asyncHandler(error404));
app.use(handler);

module.exports = app;
