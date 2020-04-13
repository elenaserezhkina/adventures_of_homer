const express = require("express");
const router = express.Router();
const connection = require("../../helpers/db.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/signup", function (req, res, next) {
  const formData = req.body;
  if (
    !formData.email ||
    !formData.password ||
    !formData.name ||
    !formData.lastname
  ) {
    return res.status(400).json({ flash: "some fields are empty" });
  }
  let hash = bcrypt.hashSync(formData.password, 10);
  connection.query(
    "INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)",
    [formData.email, hash, formData.name, formData.lastname], //object that we are sending as a value
    (err, results) => {
      if (err) res.status(500).json({ flash: err.message });
      else res.status(200).json({ flash: "User has been signed up!" });
    }
  );
});

router.post("/signin", function (req, res) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).json({ message: info.message });
    const token = jwt.sign(user, "your_jwt_secret");
    return res.json({ user, token });
  })(req, res);
});

module.exports = router;
