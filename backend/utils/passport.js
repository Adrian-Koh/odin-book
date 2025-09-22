const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const usersQueries = require("../db/usersQueries");

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const user = usersQueries.getUserByEmail(email);
  if (user) {
    return done(null, user);
  } else {
    const avatarUrl =
      profile.photos && profile.photos.length > 0
        ? profile.photos[0].value
        : null;
    const createdUser = await usersQueries.addUserGithub(
      profile.id,
      email,
      profile.displayName,
      avatarUrl
    );
    return done(null, createdUser);
  }
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
