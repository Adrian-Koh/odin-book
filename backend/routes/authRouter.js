const { Router } = require("express");
const authRouter = Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const REDIRECT_URL = "https://ak-odinbook.netlify.app";

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  function (req, res, next) {
    jwt.sign(
      { user: req.user },
      process.env.SECRET_KEY,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          return next(err);
        }
        res.redirect(`${REDIRECT_URL}?token=${token}`);
      }
    );
  }
);

module.exports = authRouter;
