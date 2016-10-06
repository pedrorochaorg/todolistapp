var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app,passport) {
  app.use('/logout', router);


};

router.get('/', function (req, res, next) {
  if(req.user){



    req.session.destroy();
    req.logout();

    res.redirect('/');

    return;

  }

});
