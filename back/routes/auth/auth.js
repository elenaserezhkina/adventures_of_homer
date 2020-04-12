const express = require("express");
const router = express.Router();
const connection = require("../../helpers/db.js");

router.post("/signup", function (req, res, next) {
  const formData = req.body;
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.name ||
    !req.body.lastname
  ) {
    return res.status(400).json({ flash: "some fields are empty" });
  }
  connection.query(
    "INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)",
    [formData.email, formData.password, formData.name, formData.lastname], //object that we are sending as a value
    (err, results) => {
      if (err) res.status(500).json({ flash: err.message });
      else res.status(200).json({ flash: "User has been signed up!" });
    }
  );
});

router.post("/signup");

module.exports = router;
