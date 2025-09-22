const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../utils/jwtUtils");
const passport = require("passport");

usersRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

usersRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.json({ message: "login success" });
  }
);

module.exports = usersRouter;
