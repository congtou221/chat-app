#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_koa_1 = require("apollo-server-koa");
var debug_1 = __importDefault(require("debug"));
var http_1 = __importDefault(require("http"));
var mongoose_1 = __importDefault(require("mongoose"));
var socket_io_1 = require("socket.io");
// import { buildSchemaSync } from 'type-graphql';
var graphql_tools_1 = require("graphql-tools");
var mongodb_1 = require("mongodb");
require("reflect-metadata");
var app_1 = __importDefault(require("../app"));
var resolver_1 = __importStar(require("../graphql/resolver"));
var schema_1 = __importDefault(require("../graphql/schema"));
var group_1 = __importDefault(require("../models/group"));
var message_1 = __importDefault(require("../models/message"));
var message_mention_1 = __importDefault(require("../models/message_mention"));
var schema = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs: schema_1.default,
    resolvers: resolver_1.default,
});
// 将 GraphQL API 添加到路由上
var apolloServer = new apollo_server_koa_1.ApolloServer({
    schema: schema,
});
// 启动 ApolloServer
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, apolloServer.start()];
                case 1:
                    _a.sent();
                    apolloServer.applyMiddleware({ app: app_1.default });
                    return [2 /*return*/];
            }
        });
    });
}
startApolloServer();
// dotenv.config();
// 连接数据库
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app');
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('MongoDB connected successfully');
    /**
     * 创建 HTTP 服务器
     */
    var server = http_1.default.createServer(app_1.default.callback());
    /**
     * 创建 SocketIO
     */
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:8080',
        },
    });
    app_1.default.context.io = io;
    // const messages: Message[] = [];
    // 启动 socket.io 长链接
    io.on('connection', function (socket) {
        console.log('A user has connected.', socket.id);
        app_1.default.context.socketId = socket.id;
        // socket.emit('message', { username: 'Server', message: 'Welcome to the chat!' });
        socket.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
            var senderId, groupId, content, mentions, replyTo, messageMention, mentionedUserId, messageModel, _a, messages, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // messages.push(message);
                        console.log('Server received: %s', message);
                        senderId = message.senderId, groupId = message.groupId, content = message.content, mentions = message.mentions, replyTo = message.replyTo;
                        if (!(mentions && (mentions === null || mentions === void 0 ? void 0 : mentions.length) > 0)) return [3 /*break*/, 2];
                        mentionedUserId = mentions[0];
                        messageMention = new message_mention_1.default({
                            userId: new mongodb_1.ObjectId(mentionedUserId),
                            content: '',
                        });
                        return [4 /*yield*/, messageMention.save()];
                    case 1:
                        _e.sent();
                        _e.label = 2;
                    case 2:
                        messageModel = new message_1.default({
                            senderId: new mongodb_1.ObjectId(senderId),
                            groupId: new mongodb_1.ObjectId(groupId),
                            content: content,
                            mentions: messageMention ? [messageMention._id] : undefined,
                            replyTo: replyTo,
                        });
                        return [4 /*yield*/, messageModel.save()];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, group_1.default.findById(new mongodb_1.ObjectId(groupId)).exec()];
                    case 4:
                        _a = ((_e.sent()) || {}).messages, messages = _a === void 0 ? [] : _a;
                        return [4 /*yield*/, group_1.default.findByIdAndUpdate(groupId, { messages: __spreadArray(__spreadArray([], messages, true), [messageModel._id], false) })];
                    case 5:
                        _e.sent();
                        _c = (_b = io.sockets).emit;
                        _d = ['message'];
                        return [4 /*yield*/, (0, resolver_1.getMessageObjList)([messageModel])];
                    case 6:
                        _c.apply(_b, _d.concat([(_e.sent())[0]]));
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on('disconnect', function () {
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
        var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
        (0, debug_1.default)('demo:server')('Listening on ' + bind);
    }
});
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
function onError(err, ctx) {
    // log the error
    console.error(err);
    // set the response status
    ctx.status = (err === null || err === void 0 ? void 0 : err.status) || 500;
    // set the response body
    ctx.body = {
        error: {
            message: err.message,
        },
    };
}
