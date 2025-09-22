const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const usersQueries = require("../db/usersQueries");

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  const avatarUrl =
    (profile.photos && profile.photos.length > 0) ?? profile.photos[0].value;
  usersQueries.addUserGithub(
    profile.id,
    profile.emails[0].value,
    profile.displayName,
    avatarUrl
  );
  console.log("Profile: " + JSON.stringify(profile));
};

const strategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/users/auth/github/callback",
  },
  verifyCallback
);
passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
