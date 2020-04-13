// declare all the necessary libraries
const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const authRouter = require("./routes/auth/auth");
const bcrypt = require("bcrypt");

//quest 080
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./helpers/db");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: "your_jwt_secret",
    },

    function (jwtPayload, cb) {
      return cb(null, jwtPayload);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    function (email, password, cb) {
      connection.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, results) => {
          if (err) {
            return cb(err);
          }
          if (!results.length) {
            return cb(null, false, { message: "Incorrect username." });
          }
          let user = results[0];
          if (!bcrypt.compareSync(password, user.password)) {
            return cb(null, false, { message: "Incorrect password." });
          }
          return cb(null, user);
        }
      );
    }
  )
);

// set up the application
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use adds middleware function. bodyParser is a library.
// bodyParser.json() returns middleware function that text in body returns object.
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/auth", authRouter); //where authRouter is imported
// implement the API part
app.get("/", (req, res) => {
  res.send("youhou");
});

/// in case path is not found, return the 'Not Found' 404 code
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// launch the node server
let server = app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + server.address().port);
});
