var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function() {
  passport.use(new GoogleStrategy({
      clientID: '350049390568-ajcnkficbsq7e81sm7rjk5k6r8k28g7n.apps.googleusercontent.com',
      clientSecret: 'cjzJDr5-1XZOFFRV5VydQ2il',
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(req, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  ));
};
