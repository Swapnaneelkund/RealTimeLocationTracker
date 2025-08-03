const session = require("express-session");

const sessionMiddleware = session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.SESSION_SECRET
});

module.exports = sessionMiddleware;
