var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');
module.exports = function (app,passport) {
  app.use('/login', router);


  router.get('/', function (req, res, next) {
    if(req.user){
      res.redirect('/');
      return;
    }
    var user = new User({
      username: 'admin',
      password: 'zaq123wsx',
      grupo: "Verde"
    });
    user.save();
    user = null;

    res.render('login',{
      title: 'Todo List',
      isLogin: true,
      message: req.flash('error')
    });
    req = null;
    res = null;

  }).post('/',passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),function(req,res,next){


    res.redirect('/');
    req = null;
    res = null;

  });

};


