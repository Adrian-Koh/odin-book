const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  //   User.findOrCreate({ githubId: profile.id }, (err, user) => {
  //     return done(err, user);
  //   });
};

const strategy = new GitHubStrategy(verifyCallback);
passport.use(strategy);
