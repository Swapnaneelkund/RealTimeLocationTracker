const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.username) {
    return res.redirect("/");
  }
  res.render("index1");
});

module.exports = router;
