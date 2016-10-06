var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var User = mongoose.model('User');
var session = require('express-session');

var flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

module.exports = function(app, config,io) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';


  app.locals.userData = null;

  //Setup View Render Engine EJS
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');
  app.set('view cache', false);
  app.set('view options', { pretty: true });
  //Setup Rooting Format
  app.set('case sensitive routing',true);
  app.set('strict routing',true);

  //Add CORS headers to each request
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //Setup Logger Instace to log requests
  app.use(logger('dev'));

  //Setup Body Response Parser Settings
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    type: 'application/x-www-form-urlencoded'
  }));

  //Set APP to trust proxy's
  app.enable('trust proxy');

  //Enable CookieParser
  app.use(cookieParser());
  //Enable compression
  app.use(compress());
  //Serve static files from public folder
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  //Setup Express Session Plugin, enabling it to store session data on the MongoDB Data Store
  app.use(session({
    secret: 'c09n083nv09npwivbiq2gbv8b2v8uobrvpi2bvgp',
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 10 * 300 * 1000
    },
    rolling: true }));
  app.use(flash());

  //Initializes Passport
  app.use(passport.initialize());
  app.use(passport.session());

  //Serializes the user to store on the session var
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  //Deserializes the stored user from session vars
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //Defines the Passport login strategy
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'passwd'
    },
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'This email address isn\'t associated with any account.' });
        }
        if (!user.comparePassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  //Stores loged in user details on a "Global" var
  app.use(function(req,res,next){
    app.locals.userData = req.user;
    console.log(req.user);

    next();
  });



  //Get All Controllers from the Controllers folder
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app,passport,io);
  });


  //Get request and present a Page not found
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  //Renders the Error template, detailing the error messages
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        data: err,
        status: 'false'
      });
    });
  }

  //Renders the Error template
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.json({
        message: err.message,
        data: {},
        status: 'false'
      });
  });

};
