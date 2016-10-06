var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  async = require('async'),
  request = require('request'),
  User = mongoose.model('User'),
  Todo = mongoose.model('Todo');


module.exports = function (app,passport) {
  app.use('/', router);




};

function cleanUserObject(user,into){
  var object = {};
  object.id = user.id;
  object.username = user.username;
  if(into==undefined || into==false)
    object.password = user.password;
  object.grupo = user.grupo;


  return object;
}
function cleanTodoObject(todo,users){
  var object = {};

  object.id = todo.id;
  object.user = cleanUserObject(users[todo.user],true);
  object.text = todo.text;
  object.grupo = todo.grupo;
  object.status = todo.status;
  object.updated_at = todo.updated_at;
  return object;
}



router.get('/', function (req, res, next) {

  var verdes = [];
  var azuis = [];
  var vermelhos = [];


  if(!req.user){
    res.redirect('/login');
    req = null;
    res = null;
    return;
  }
  async.parallel([
    function (callback){
      User.find().exec(function(err,data){
        callback(err,data);

      });
    },
    function (callback){
      Todo.find({grupo: 'Verde'}).exec(function(err,data){
        callback(err,data);

      });
    },
    function (callback){
      Todo.find({grupo: 'Azul'}).exec(function(err,data){
        callback(err,data);

      });
    },
    function (callback){
      Todo.find({grupo: 'Vermelho'}).exec(function(err,data){
        callback(err,data);

      });
    }

  ],function(err,results){
    if(err){
      next();
    }
    if(results[0].length==0){
      next();
    }
    var tempUsers = {};

    for(var user in results[0]){
      tempUsers[results[0][user].id] = cleanUserObject(results[0][user],true);
    }

    for(var item in results[1]){
      verdes.push(cleanTodoObject(results[1][item],tempUsers));
    }

    for(var item in results[2]){
      azuis.push(cleanTodoObject(results[2][item],tempUsers));
    }

    for(var item in results[3]){
      vermelhos.push(cleanTodoObject(results[3][item],tempUsers));
    }

  var str = JSON.stringify(cleanUserObject(req.user,true));
    while(str.indexOf('"')!=-1){
      str = str.replace('"',"'");
    }
    res.render('index', {
      title: 'TodoList',
      user: str,
      userGrupo: req.user.grupo,
      verdes: JSON.stringify(verdes),
      azuis: JSON.stringify(azuis),
      vermelhos: JSON.stringify(vermelhos)

    });

  });






  //getDateInterval




});
