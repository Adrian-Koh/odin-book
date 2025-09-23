const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../utils/jwtUtils");
const passport = require("passport");
const jwt = require("jsonwebtoken");

usersRouter.get(
  "/auth/github",
  passport.authenticate("github", { session: false, scope: ["user:email"] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

usersRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  function (req, res, next) {
    console.log("req.user: " + JSON.stringify(req.user));

    jwt.sign(
      { user: req.user },
      process.env.SECRET_KEY,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          return next(err);
        }
        res.json({ token, message: "login success" });
      }
    );
  }
);

module.exports = usersRouter;
