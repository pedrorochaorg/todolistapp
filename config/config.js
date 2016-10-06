var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'todolist'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/todolist-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'todolist'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/todolist-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'todolist'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/todolist-production'
  }
};

module.exports = config[env];
