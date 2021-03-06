var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');


module.exports = function() {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENTID,
            clientSecret: process.env.FACEBOOK_CLIENTSECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            passReqToCallback: true,
            profileFields: ['id', 'emails', 'displayName', 'name', 'gender']
        },
        function(req, accessToken, refreshToken, profile, done) {
            if (req.user) {
                // already logged in (another social account)
                var query = {};
                if (req.user.google) {
                    console.log('google');
                    var query = {
                        'google.id': req.user.google.id
                    };
                } else if (req.user.twitter) {
                    var query = {
                        'twitter.id': req.user.twitter.id
                    }
                }
                User.findOne(query, function(error, user) {
                    if (user) {
                        user.facebook = {};
                        user.facebook.id = profile.id;
                        user.facebook.token = accessToken;

                        user.displayName = profile.displayName;

                        user.save();
                        done(null, user);
                    }
                });
            } else {
                var query = {
                    'facebook.id': profile.id
                };

                User.findOne(query, function(error, user) {
                    if (user) {
                        console.log('found!');
                        done(null, user);
                    } else {
                        console.log('not found');
                        var user = new User;

                        user.email = profile.emails[0].value;
                        user.displayName = profile.displayName;

                        user.facebook = {};
                        user.facebook.id = profile.id;
                        user.facebook.token = accessToken;

                        user.save();
                        done(null, user);
                    }
                });
            }
        }));
}
