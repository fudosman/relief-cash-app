const express = require("express");
const asyncHandler = require('express-async-handler');
const treblle = require("@treblle/express");
const { TRB_API_KEY, TRB_PROJ_ID } = require("./configs").env;
const { handler, error404, homePageError } = require('./errors');
const user = require('./routes/user.route');
const admin = require('./routes/admin.route');
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

app.use(
  treblle({
    apiKey: TRB_API_KEY,
    projectId: TRB_PROJ_ID,
  })
);

// handlers
app.get("/", homePageError);
app.use("/api/users", asyncHandler(user));
app.use("/api/admins", asyncHandler(admin));
app.use("*", asyncHandler(error404));
app.use(handler);

module.exports = app;
