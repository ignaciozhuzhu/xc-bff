#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('myapp:server');
var http = require('http');


// Initialize Apollo Server

//用于engine server监控
// const { ApolloEngine } = require("apollo-engine");
// const engine = new ApolloEngine({
//   apiKey: "service:ignaciozhuzhu-8364:o8wXwU_ZIOG9Ws0n7bc2_w"
// });

// const { ApolloServer } = require("apollo-server-express");
// const server = new ApolloServer({
//   typeDefs: `
//   scalar Upload
// `,
//   //resolvers,
//   tracing: true,
//   cacheControl: true,
//   // We set `engine` to false, so that the new agent is not used.
//   engine: false
// });
// server.applyMiddleware({ app });


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3003');
app.set('port', port);

/**
 * Create HTTP server.
 */


/**
 * Listen on provided port, on all network interfaces.
 */

//用于engine server监控
//engine.listen({port,expressApp: app});

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log(`服务已开启在  ${addr.port} 端口, graphiql可视化访问地址增加 /graphql`);
}