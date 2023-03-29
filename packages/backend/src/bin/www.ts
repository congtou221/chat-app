#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { ApolloServer } from 'apollo-server-koa';
import debug from 'debug';
import http from 'http';
import { Context } from 'koa';
import mongoose from 'mongoose';
import { Server as SocketIOServer, Socket } from 'socket.io';
// import { buildSchemaSync } from 'type-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import 'reflect-metadata';
import app from '../app';
import resolvers from '../graphql/message';
import typeDefs from '../graphql/schema';

type Message = {
  username: string;
  message: string;
};

interface MyError extends Error {
  status?: number;
}

// 根据 resolvers 生成 schema
// const schema = buildSchema({
//   resolvers: [MessageResolver],
//   emitSchemaFile: path.resolve(__dirname, '../graphql/schema.gql'),
// });

// const typeDefs = `type Query {
//   user: String
// }`;
// const resolvers = {
//   Query: {
//     user: () => 'Hello world!',
//   },
// };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// 将 GraphQL API 添加到路由上
const apolloServer = new ApolloServer({
  schema,
});
// 启动 ApolloServer
async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startApolloServer();

// dotenv.config();

// 连接数据库
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
  /**
   * 创建 HTTP 服务器
   */
  var server = http.createServer(app.callback());

  /**
   * 创建 SocketIO
   */
  const io = new SocketIOServer(server);

  app.context.io = io;

  // const messages: Message[] = [];

  // 启动 socket.io 长链接
  io.on('connection', (socket: Socket) => {
    console.log('A user has connected.', socket.id);

    app.context.socketId = socket.id;

    socket.emit('message', { username: 'Server', message: 'Welcome to the chat!' });

    socket.on('message', (message: Message) => {
      // messages.push(message);
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('A user has disconnected.', socket.id);
    });
  });

  // 使用 Koa-Socket.IO 中间件
  // app.use(koaSocket(io, app));

  server.on('error', onError);
  server.on('listening', onListening);

  // 启动服务器
  var port = normalizePort(process.env.PORT || '3000');
  server.listen(port);

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    debug('demo:server')('Listening on ' + bind);
  }
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
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

function onError(err: MyError, ctx: Context) {
  // log the error
  console.error(err);

  // set the response status
  ctx.status = err?.status || 500;

  // set the response body
  ctx.body = {
    error: {
      message: err.message,
    },
  };
}

