var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'control-node-relay'
    },
    port: 3000,
    db: 'mongodb://localhost/control-node-relay-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'control-node-relay'
    },
    port: 3000,
    db: 'mongodb://localhost/control-node-relay-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'control-node-relay'
    },
    port: 3000,
    db: 'mongodb://localhost/control-node-relay-production'
  }
};

module.exports = config[env];
