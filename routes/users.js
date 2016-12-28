var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')
(process.env.FACEBOOK_CLIENTID, process.env.FACEBOOK_CLIENTSECRET);


router.use('/', function(req, res, next) {
  if (!req.user) {
    // user not logged in -> redirect
    res.redirect('/');
  }
  next();
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.user.facebook) {
  facebook.getImage(req.user.facebook.token,
      function(results){
        req.user.facebook.image = results.url;
        res.render('users', {user: req.user});
      })
  } else {
    res.render('users', {user: req.user});
  }
});

module.exports = router;
