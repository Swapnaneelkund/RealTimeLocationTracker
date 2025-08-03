const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/map");
});

module.exports = router;
