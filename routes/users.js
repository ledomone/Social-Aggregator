var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
  if (!req.user) {
    // user not logged in -> redirect
    res.redirect('/');
  }
  next();
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {user: req.user});
});

module.exports = router;
