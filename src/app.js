const express = require("express");
const asyncHandler = require('express-async-handler')
const { handler, error404 } = require('./errors');
const comment = require('./routes/comment.route');
const post = require('./routes/post.route');
const user = require('./routes/user.route');
const money = require('./routes/money.route');
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
app.use("/api/comments", asyncHandler(comment));
app.use("/api/posts", asyncHandler(post));
app.use("/api/users", asyncHandler(user));
app.use("/api/money", asyncHandler(money));
app.use("*", asyncHandler(error404));
app.use(handler);

module.exports = app;
