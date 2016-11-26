var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '1166796340102669',
    clientSecret: 'fa4e0a6cf99205901034ca5b0d10d9c9',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'emails', 'displayName', 'name', 'gender'] 
  },
  function(req, accessToken, refreshToken, profile, done){
    var user = {};

    user.email = profile.emails[0].value;
    user.displayName = profile.displayName;

    user.facebook = {};
    user.facebook.id = profile.id;
    user.facebook.token = accessToken;

    done(null, user);

  }));
}
