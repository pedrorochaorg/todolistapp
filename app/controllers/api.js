var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  config = require('../../config/config'),
  async = require('async'),
  Todo = mongoose.model('Todo'),
  User = mongoose.model('User');


/*
  Validation Methods
 */

function checkIfUsernameExists(username,_callback){
  User.findOne({username: username},function(err,data){
    if(err){
        _callback(null);
        return;
    }

    _callback(data);

  });
}

function checkIfUsernameExistsExceptId(username,id,_callback){
  User.findOne({username: username,'_id': {$ne: id}},function(err,data){
    if(err){
      _callback(null);
      return;
    }

    _callback(data);

  });
}


/*
  Response Serializers
 */

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

var responseObject = function() {
  var status = true,
    message="",
    data=null;
};

/*
  Helper Methods
 */
function updateUser(user,req,res,next){
  var response = new responseObject();

  if(req.body.username!='' && req.body.username!=null && req.body.username!=undefined)
    user.username = req.body.username;

  if(req.body.password!='' && req.body.password!=null && req.body.password!=undefined)
    user.password = req.body.password;

  if(req.body.grupo!='' && req.body.grupo!=null && req.body.grupo!=undefined)
    user.grupo = req.body.grupo;

  user.save(function(err,data){
    if(!err){
      response.status = true;
      response.message = 'User updated!';
      response.data = cleanUserObject(data);
      res.json(response);
      return;
    }
    response.status = true;
    response.message = 'Something Wrong ocurred';
    response.data = err;
    res.json(response);
    return;
  });
}
function updateTodo(todo,req,res,next,io){
  var response = new responseObject();

  if(req.body.text!='' && req.body.text!=null && req.body.text!=undefined)
    todo.text = req.body.text;
  console.log(todo);

  if(req.body.status!='' && req.body.status!=null && req.body.status!=undefined)
    todo.status = req.body.status;


  todo.save(function(err,todoData){
    if(!err){
      User.findById(todoData.user,function(err,data){
        if(err && data!=null){
          response.status = true;
          response.message = 'Something Wrong ocurred';
          response.data = err;
          res.json(response);
          return;
        }
        var arr = {};
        arr[data.id] = data;
        response.status = true;
        response.message = 'Todo updated!';
        response.data = cleanTodoObject(todoData,arr);
        io.sockets.emit('message', {action:'update', data: response.data});

        res.json(response);
        return;

      });
      return;

    }
    response.status = true;
    response.message = 'Something Wrong ocurred';
    response.data = err;
    res.json(response);
    return;
  });
}

function parseObjectArrayToPath(arr){
  var response = "";
  for(var item in arr){
    for(var obj in arr[item]) {
      if (response != "") {
        response += "&"
      }
      if (typeof arr[item][obj] == 'object'){
        if(arr[item][obj]['$in']!=undefined){
          for(var oo in arr[item][obj]['$in']){
            if (response != "") {
              response += "&"
            }
            response += obj + "[]=" + oo
          }
        }
      }
      else
        response += obj + "=" + arr[item][obj];
    }
  }
  return response;

}

function parseUsers(data){
  var returnArr = {};
  for(var item in data){
    returnArr[data[item].id]=data[item];
  }
  return returnArr;
}


module.exports = function (app,config,io) {
  app.use('/api', router);

  /**
   * @apiDefine ResponseData
   *
   * @apiSuccess {Boolean} status True or False Boolean value, specifies if the request was successfull .
   * @apiSuccess {String} message  Status message about the request, usually contains success or error messages.
   * @apiSuccess {Object} data Response data.
   *
   *
   */


  /**
   * @apiDefine SomethingWentWrong
   *
   * @apiError SomethingWentWrong something happened on the API core.
   * @apiErrorExample SomethingWentWrong-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status" : false,
   *       "message" : "Something went wrong!",
   *       "data" : null
   *     }
   */
  /**
   * @apiDefine ServerError
   *
   * @apiError API Error something happened on the Server.
   * @apiErrorExample ServerError-Response:
   *     HTTP/1.1 503 Bad Gateway
   *     NULL
   *
   *
   */


  /**
   * @api {get} /api Status
   * @apiName Status
   * @apiDescription Check API Activity status
   * @apiGroup API
   *
   *
   * @apiUse ResponseData
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": true,
   *       "message": "Doe",
   *       "data" : null
   *     }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
  router.route('/')
    .get(function (req, res, next) {
      var response = new responseObject();

      response.message = "Live!";
      response.status = true;
      response.data = null;

      res.json(response);
      response = null;
    }
  );

  /**
   * @api {post} /api/users Add User
   * @apiName Add User
   * @apiDescription Add a new User or to the database
   * @apiGroup Users
   *
   * @apiParam {String} username Username string format
   * @apiParam {String} password Password string format
   * @apiParam {String="Verde","Vermelho","Azul"} grupo a string that can contain the words "Verde","Vermelho" or "Azul".
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status": true,
   *        "message": "All Went Fine!",
   *        "data": {
   *                  "id": "57d1845358c23f41a251e366",
   *                  "username": "sampleuser",
   *                  "password": "Pgo1iEks57d1845358c23f41a251e366",
   *                  "grupo": "Verde"
   *        }
   *    }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
  router.route('/users').post(function (req, res, next) {

    var response = new responseObject();
    var grupos = ["Vermelho","Verde","Azul"];

    // Everything went fine



    if(!req.body.username){
      response.status = false;
      response.data = null;
      response.message = "A Username is required";
      res.json(response);
      return;
    }

    if(!req.body.password){
      response.status = false;
      response.data = null;
      response.message = "A Password is required";
      res.json(response);
      return;
    }

    if(!req.body.grupo){
      response.status = false;
      response.data = null;
      response.message = "A Grupo is required";
      res.json(response);
      return;
    }

    if(grupos.indexOf(req.body.grupo)==-1){
      response.status = false;
      response.data = null;
      response.message = "Grupo is not one of the available choices";
      res.json(response);
      return;
    }

    checkIfUsernameExists(req.body.username,function(data){
      if(data!=null){
        response.status = false;
        response.data = null;
        response.message = "Username already exists";
        res.json(response);
        return;
      }
      var user = new User();
      user.username = req.body.username;
      user.password = req.body.username;
      user.grupo = req.body.grupo;
      user.save(function(err,data){
        if(!err){
          response.status = false;
          response.data = cleanUserObject(data);
          response.message = "User Created Successfully";
          res.json(response);
          return;
        }
        response.status = false;
        response.data = null;
        response.message = err;
        res.json(response);
        return;

      });

    });

  })
  /**
   * @api {get} /api/users List Users
   * @apiName List Users
   * @apiDescription List all stored users
   * @apiGroup Users
   *
   * @apiParam {Integer} p Set's the page from were to list resutls, defaults to page 1, to get all pages set this value to -1
   * @apiParam {Integer} itemsPerPage Set's the number of items to list in each page
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status": true,
   *        "message": "All went fine!",
   *        "data": {
   *          "users": [
   *            {
   *              "id": "57d1845358c23f41a251e366",
   *              "username": true,
   *              "password": "Pgo1iEks57d1845358c23f41a251e366",
   *              "grupo": "Verde"
   *            },
   *            {
   *              "id": "57d1845358c23f41a251e366",
   *              "username": true,
   *              "password": "Pgo1iEks57d1845358c23f41a251e366",
   *              "grupo": "Verde"
   *            },
   *            ....
   *          ],
   *          "totalItems": 2,
   *          "next": null,
   *          "previous": null,
   *          "numPages": 1
   *        }
   *  }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
    .get(function (req,res,next){
      var response = new responseObject();
      var queryParameters = [];
      var totalItems = 0;
      var page = 1;
      var pages = 0;
      var itemsPerPage = config.itemsPerPage;

      queryParameters.push({username: {$ne: null}});
      if(req.query.itemsPerPage!=null && req.query.itemsPerPage!=undefined && req.query.itemsPerPage!=false){
        itemsPerPage = parseInt(req.query.itemsPerPage, 10);
      }




      function finalCallback() {
        User.find().and(queryParameters).sort({'created_at': -1}).skip((page-1)*itemsPerPage).limit(itemsPerPage).exec(function (err, items) {
          if (err) {
            response.status = false;
            response.message = err.message;
            response.data = null;
          }
          else {

            response.status = true;
            response.message = "All went fine!";

            if(page>1) {

              if(page<pages) {
                response.data = {users: [], totalItems: totalItems, next:  req.protocol + '://' + req.get('host') + '/api/users?p=' + (parseInt(page)+1), previous:  req.protocol + '://' + req.get('host') + '/api/users?p=' + (parseInt(page)-1), numPages: pages};
              }
              else
              {
                response.data = {users: [], totalItems: totalItems, next: null, previous:  req.protocol + '://' + req.get('host') + '/api/users?p=' + (parseInt(page)-1), numPages: pages};

              }
            }
            else
            {
              if(page<pages) {
                response.data = {users: [], totalItems: totalItems, next:  req.protocol + '://' + req.get('host') + '/api/users?p=' + (parseInt(page)+1), previous: null, numPages: pages};
              }
              else
              {
                response.data = {users: [], totalItems: totalItems, next: null, previous: null, numPages: pages};

              }
            }

            for (var i in items) {
              response.data.users.push(cleanUserObject(items[i]));
            }

          }
          res.json(response);
          res = null;
          response = null;
          totalItems = null;
          page = null;
          pages = null;
          queryParameters = null;
          items = null;
          itemsPerPage = null;
          return;
        });
      }


      User.find().and(queryParameters).sort({'created_at': 1}).exec(function (err, items) {
        if (err) {
          response.status = false;
          response.message = err.message;
          response.data = null;
          res.json(response);
          res = null;
          response = null;
          totalItems = null;
          page = null;
          pages = null;
          queryParameters = null;
          items = null;
          itemsPerPage = null;
          return;
        }
        else
        {
          pages = Math.ceil(items.length / itemsPerPage);
          totalItems = items.length;

          if(req.query.p!=null && req.query.p!=undefined && req.query.p!=false)
          {
            page = req.query.p;
          }
          if(page==-1){
            response.status = true;
            response.message = "All Went fine!";
            response.data = {users: [], totalItems: items.length, next: null, previous: null, numPages: 1};
            for (var i in items) {
              response.data.users.push(cleanUserObject(items[i]));
            }
            res.json(response);
            res = null;
            response = null;
            totalItems = null;
            page = null;
            pages = null;
            queryParameters = null;
            items = null;
            itemsPerPage = null;
            return;

          }
          else if(page<=0 || page>pages)
          {
            response.status = false;
            response.message = "Invalid page number";
            response.data = null;
            res.json(response);
            res = null;
            response = null;
            totalItems = null;
            page = null;
            pages = null;
            queryParameters = null;
            items = null;
            itemsPerPage = null;
            return;
          }
          else
            finalCallback();
        }
      });
    });
  /**
   * @api {get} /api/users/:user_ud Get User
   * @apiName Get User By ID
   * @apiDescription Get User By ID
   * @apiGroup Users
   *
   * @apiParam {String} user_id User ID
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": true,
   *       "message": "All Went Fine!",
   *       "data": {
   *         "id": "57d1845358c23f41a251e366",
   *         "username": "sampleuser",
   *         "password": "Pgo1iEks57d1845358c23f41a251e366",
   *         "grupo": "Verde"
   *       }
   *     }
   *
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
  router.route('/users/:user_id').get(function (req, res, next) {

    var response = new responseObject();
      User.findById(req.params.user_id, function (err, user) {
        if (err) {
          response.status = false;
          response.message = err.message;
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          user = null;
          return;
        }

        if(!user){
          response.status = false;
          response.message = 'Record not found';
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          user = null;
          return;
        }

        response.status = true;
        response.message = 'All went fine!';
        response.data = cleanUserObject(user);
        res.json(response);
        res = null;
        req = null;
        response = null;
        user = null;
        return;
      });



  })
  /**
   * @api {post} /api/users/:user_id Update User
   * @apiName Update User
   * @apiDescription Update an existing User
   * @apiGroup Users
   *
   * @apiParam {String} username Username string format
   * @apiParam {String} password Password string format
   * @apiParam {String="Verde","Vermelho","Azul"} grupo a string that can contain the words "Verde","Vermelho" or "Azul".
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status": true,
   *        "message": "User updated!",
   *        "data": {
   *                  "id": "57d1845358c23f41a251e366",
   *                  "username": "sampleuser",
   *                  "password": "Pgo1iEks57d1845358c23f41a251e366",
   *                  "grupo": "Verde"
   *        }
   *    }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
    .post(function (req, res, next) {

      var response = new responseObject();
      var grupos = ["Vermelho","Verde","Azul"];
      var updateFlag = false;

      User.findById(req.params.user_id, function (err, user) {
        if (err) {
          response.status = false;
          response.message = err.message;
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          user = null;
          return;
        }

        if(!user){
          response.status = false;
          response.message = 'Record not found';
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          user = null;
          return;
        }



        if(req.body.username!=null){
          updateFlag = true;
        }

        if(req.body.password!=null){
          updateFlag = true;
        }

        if(req.body.grupo!=null){
          updateFlag = true;
        }

        if(!updateFlag){
          response.status = false;
          response.message = 'Nothing to update';
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          user = null;
          return;
        }

        if(req.body.username!=''){
          checkIfUsernameExistsExceptId(req.body.username,user.id,function(data){
              if(!data){
                updateUser(user,req,res,next);
              }
              else{
                response.status = false;
                response.message = 'Username already exists';
                response.data = null;
                res.json(response);
                res = null;
                req = null;
                response = null;
                user = null;
                return;
              }
          });
        }else{

          updateUser(user,req,res,next);
        }

      });



    })
  /**
   * @api {delete} /api/users/:user_id Delete User
   * @apiName Delete User
   * @apiDescription Delete an existing User
   * @apiGroup Users
   *
   * @apiParam {String} user_id User ID
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status": true,
   *        "message": "User deleted!",
   *        "data": { }
   *    }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
    .delete(function(req, res, next){
      var response = new responseObject();

      User.remove({_id:req.params.user_id}, function (err, user) {
        if(err){
          response.status = false;
          response.message = err.message;
          response.data = err;
          res.json(response);
          return;
        }

        response.status = true;
        response.message = 'User successfuly deleted!';
        response.data = {};
        res.json(response);
        return;

      });
    });




  /**
   * @api {post} /api/todos Add Todo
   * @apiName Add Todo
   * @apiDescription Add a new Todo to the database
   * @apiGroup Todos
   *
   * @apiParam {String} user User id string format
   * @apiParam {String} text Task/Text string format
   * @apiParam {String="Verde","Vermelho","Azul"} grupo a string that can contain the words "Verde","Vermelho" or "Azul".
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status": true,
   *        "message": "All Went Fine!",
   *        "data": {
   *                  "id": "57d1845358c23f41a251e366",
   *                  "user": {
   *                            "id": "57d1845358c23f41a251e366",
   *                            "username": "sampleuser",
   *                            "grupo": "Verde"
   *                  },
   *                  "text": "Task description",
   *                  "grupo": "Verde",
   *                  "status": true
   *        }
   *    }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
  router.route('/todos').post(function (req, res, next) {

    var response = new responseObject();
    var grupos = ["Vermelho","Verde","Azul"];

    // Everything went fine



    if(!req.body.user){
      response.status = false;
      response.data = null;
      response.message = "A User is required";
      res.json(response);
      return;
    }

    if(!req.body.grupo){
      response.status = false;
      response.data = null;
      response.message = "A Grupo is required";
      res.json(response);
      return;
    }

    if(!req.body.text){
      response.status = false;
      response.data = null;
      response.message = "A Text/Task is required";
      res.json(response);
      return;
    }

    if(grupos.indexOf(req.body.grupo)==-1){
      response.status = false;
      response.data = null;
      response.message = "Grupo is not one of the available choices";
      res.json(response);
      return;
    }
    User.findById(req.body.user, function(err,user) {
      if(!err && user!=null) {

        var todo = new Todo();
        todo.user = req.body.user;
        todo.grupo = req.body.grupo;
        todo.text = req.body.text;
        todo.status = (req.body.status!=undefined)?req.body.status:true;
        todo.save(function (err, data) {
          if (!err) {
            var arr = {}
            arr[user.id] = user;
            response.status = true;
            response.data = cleanTodoObject(data,arr);
            response.message = "Todo Created Successfully";
            io.sockets.emit('message', {action:'create', data: response.data});
            res.json(response);
            return;
          }
          response.status = false;
          response.data = null;
          response.message = err;
          res.json(response);
          return;

        });
      }
      else{
        if(data==null){
          response.status = false;
          response.data = null;
          response.message = 'Invalid user ID';
          res.json(response);
          return;
        }
        else if(err){
          response.status = false;
          response.data = null;
          response.message = err;
          res.json(response);
          return;
        }
      }

    });


  })
  /**
   * @api {get} /api/todos List Todos
   * @apiName List Todos
   * @apiDescription List all stored todos
   * @apiGroup Todos
   *
   * @apiParam {String} user Filter results based on an user id string
   * @apiParam {String[]} grupo Filter the result set based on a list of Grupo's
   * @apiParam {Integer} p Set's the page from were to list resutls, defaults to page 1, to get all pages set this value to -1
   * @apiParam {Integer} itemsPerPage Set's the number of items to list in each page
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status": true,
   *        "message": "All went fine!",
   *        "data": {
   *          "todos": [
   *            {
   *                  "id": "57d1845358c23f41a251e366",
   *                  "user": "57d1845358c23f41a251e366",
   *                  "text": "Task description",
   *                  "grupo": "Verde",
   *                  "status": true
   *            },
   *            {
   *                  "id": "57d1845358c23f41a251e366",
   *                  "user": "57d1845358c23f41a251e366",
   *                  "text": "Task description",
   *                  "grupo": "Verde",
   *                  "status": true
   *            },
   *            ....
   *          ],
   *          "totalItems": 2,
   *          "next": null,
   *          "previous": null,
   *          "numPages": 1
   *        }
   *  }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
    .get(function (req,res,next){
      var response = new responseObject();
      var queryParameters = [];
      var totalItems = 0;
      var page = 1;
      var pages = 0;
      var itemsPerPage = config.itemsPerPage;

      queryParameters.push({created_at: {$ne: null}});


      if(req.query.itemsPerPage!=null && req.query.itemsPerPage!=undefined && req.query.itemsPerPage!=false){
        itemsPerPage = parseInt(req.query.itemsPerPage, 10);
      }

      if(req.query.user!=null && req.query.user!=undefined){
        queryParameters.push({user: req.query.user});
      }

      if(req.query.p!=null && req.query.p!=undefined && req.query.p!=false) {
        page = req.query.p;
      }

      if(req.query.grupo!=null && req.query.grupo!=undefined){
        if(typeof req.query.grupo == 'string'){
          req.query.grupo = [req.query.grupo];
        }

        queryParameters.push({grupo: {$in:req.query.grupo}});
      }



      function issueErrorResponse(message){
        var response = new reponseObject();
        response.status = false;
        response.message = message;
        response.data = null;
        res.json(response);
      }









      function finalCallback(users) {
        Todo.find().and(queryParameters).sort({'created_at': -1}).skip((page-1)*itemsPerPage).limit(itemsPerPage).exec(function (err, items) {
          var queryParametersUrl = parseObjectArrayToPath(queryParameters);

          if (err) {
            response.status = false;
            response.message = err.message;
            response.data = null;
          }
          else {

            response.status = true;
            response.message = "All went fine!";

            if(page>1) {

              if(page<pages) {
                response.data = {todos: [], totalItems: totalItems, next:  req.protocol + '://' + req.get('host') + '/api/todos?p=' + (parseInt(page)+1)+((queryParametersUrl!='')?'&'+queryParametersUrl:''), previous:  req.protocol + '://' + req.get('host') + '/api/todos?p=' + (parseInt(page)-1)+((queryParametersUrl!='')?'&'+queryParametersUrl:''), numPages: pages};
              }
              else
              {
                response.data = {todos: [], totalItems: totalItems, next: null, previous:  req.protocol + '://' + req.get('host') + '/api/todos?p=' + (parseInt(page)-1)+((queryParametersUrl!='')?'&'+queryParametersUrl:''), numPages: pages};

              }
            }
            else
            {
              if(page<pages) {
                response.data = {todos: [], totalItems: totalItems, next:  req.protocol + '://' + req.get('host') + '/api/todos?p=' + (parseInt(page)+1)+((queryParametersUrl!='')?'&'+queryParametersUrl:''), previous: null, numPages: pages};
              }
              else
              {
                response.data = {todos: [], totalItems: totalItems, next: null, previous: null, numPages: pages};

              }
            }

            for (var i in items) {
              response.data.todos.push(cleanTodoObject(items[i],users));
            }

          }
          res.json(response);
          res = null;
          response = null;
          totalItems = null;
          page = null;
          pages = null;
          queryParameters = null;
          items = null;
          itemsPerPage = null;
          return;
        });
      }

      async.parallel([
        function(callback){
          User.find().sort({'created_at': 1}).exec(function(err,items){
            if(err){
              callback(null,{status: false, data: null});
            }
            else{
              callback(null,{status: true, data: items});
            }
          });
        },
        function(callback){
          Todo.find().and(queryParameters).sort({'created_at': 1}).exec(function (err, items) {
            if (err) {
              callback(null,{status: false, data: err.message});
            }
            else
            {
              pages = Math.ceil(items.length / itemsPerPage);
              totalItems = items.length;

              if(page==-1){
                var obj = {status: true,data:{todos: [], totalItems: items.length, next: null, previous: null, numPages: 1} };
                obj.data.todos.push(items[i]);
                callback(null,obj);

              }
              else if(page<=0 || page>pages)
              {
                callback(null,{status: false, data: err.message});
              }
              else
              {
                callback(null,{status: true, data: null});
              }
            }
          });
        }
      ],
      function(err, results) {
        console.log(results);
        if(results[0].status == false){
          issueErrorResponse(results[0].data);
          return;
        }
        var users = parseUsers(results[0].data);

        if(results[1].status == false){
          issueErrorResponse(results[1].data);
          return;
        }
        if(results[1].data == null){
          finalCallback(users);
          return;
        }
        else{
          for(var item in results[1].data.todos){
            results[1].data.todos[item] = cleanTodoObject(results[1].data.todos[item],users);
          }

          response.status = true;
          response.message = 'All Went fine';
          response.data = results[1].data;

          res.json(response);
        }

        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
      });




    });
  /**
   * @api {get} /api/todos/:todo_id Get Todo
   * @apiName Get Todo By ID
   * @apiDescription Get Todo By ID
   * @apiGroup Todos
   *
   * @apiParam {String} todo_id Todo ID
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": true,
   *       "message": "All Went Fine!",
   *       "data": {
   *                  "id": "57d1845358c23f41a251e366",
   *                  "user": "57d1845358c23f41a251e366",
   *                  "text": "Task description",
   *                  "grupo": "Verde",
   *                  "status": true
   *       }
   *     }
   *
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
  router.route('/todos/:todo_id').get(function (req, res, next) {

    var response = new responseObject();
    Todo.findById(req.params.todo_id, function (err, todo) {
      if (err) {
        response.status = false;
        response.message = err.message;
        response.data = null;
        res.json(response);
        res = null;
        req = null;
        response = null;
        todo = null;
        return;
      }

      if(!todo){
        response.status = false;
        response.message = 'Record not found';
        response.data = null;
        res.json(response);
        res = null;
        req = null;
        response = null;
        todo = null;
        return;
      }
      User.findById(todo.user,function(err,data){

        if(err){
          response.status = false;
          response.message = 'Something Went Wrong!';
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          todo = null;
          return;
        }

        response.status = true;
        response.message = 'All went fine!';
        var arr = {};
        arr[data.id] = data;
        response.data = cleanTodoObject(todo,arr);
        res.json(response);
        res = null;
        req = null;
        response = null;
        todo = null;
        return;
      });

    });



  })
  /**
   * @api {post} /api/todos/:todo_id Update Todo
   * @apiName Update Todo
   * @apiDescription Update an existing Todo
   * @apiGroup Todos
   *
   * @apiParam {String} text Task/Text string format
   * @apiParam {Boolean} status Todo Status
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status": true,
   *        "message": "Todo updated!",
   *        "data": {
   *                  "id": "57d1845358c23f41a251e366",
   *                  "user": "57d1845358c23f41a251e366",
   *                  "text": "Task description",
   *                  "grupo": "Verde",
   *                  "status": true
   *        }
   *    }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
    .post(function (req, res, next) {

      var response = new responseObject();
      var grupos = ["Vermelho","Verde","Azul"];
      var updateFlag = false;

      Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
          response.status = false;
          response.message = err.message;
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          todo = null;
          return;
        }

        if(!todo){
          response.status = false;
          response.message = 'Record not found';
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          todo = null;
          return;
        }



        if(req.body.text!=null){
          updateFlag = true;
        }

        if(req.body.status!=null){
          updateFlag = true;
        }


        if(!updateFlag){
          response.status = false;
          response.message = 'Nothing to update';
          response.data = null;
          res.json(response);
          res = null;
          req = null;
          response = null;
          user = null;
          return;
        }

        if(req.body.text!=''){
          if(req.body.text.indexOf('[done]')!=-1){
            req.body.text = req.body.text.replace('[done]','');
            todo.status = false;
          }

          updateTodo(todo,req,res,next,io);

        }else{

          updateTodo(todo,req,res,next,io);
        }

      });



    })
  /**
   * @api {delete} /api/todos/:todo_id Delete Todo
   * @apiName Delete Todo
   * @apiDescription Delete an existing Todo
   * @apiGroup Todos
   *
   * @apiParam {String} todo_id Todo ID
   *
   * @apiUse ResponseData
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "status": true,
   *        "message": "Todo deleted!",
   *        "data": { }
   *    }
   *
   * @apiUse SomethingWentWrong
   *
   * @apiUse ServerError
   *
   */
    .delete(function(req, res, next){
      var response = new responseObject();

      Todo.remove({_id:req.params.todo_id}, function (err) {
        if(err){
          response.status = false;
          response.message = err.message;
          response.data = err;
          res.json(response);
          return;
        }


        response.status = true;
        response.message = 'Todo successfuly deleted!';
        io.sockets.emit('message', {action:'delete', data: req.params.todo_id});

        response.data = {};
        res.json(response);
        return;

      });
    });
};
