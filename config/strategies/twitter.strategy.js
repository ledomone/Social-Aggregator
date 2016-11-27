var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');

module.exports = function() {
  passport.use(new TwitterStrategy({
    consumerKey: '',
    consumerSecret: '',
    callbackURL: '',
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    // function called with Twitter callback

    var query = {
      'twitter.id': profile.id
    };
    User.findOne(query, function(error, user) {
      if (user) {
        console.log('found!');
        done(null, user);
      } else {
        console.log('not found');
        var user = new User;

        user.image = profile._json.image.url;
        user.displayName = profile.displayName;

        user.twitter = {};
        user.twitter.id = profile.id;
        user.twitter.token = accessToken;

        user.save();
        done(null, user);
      }
    });
  }
};
