"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_koa_1 = require("apollo-server-koa");
var mongodb_1 = require("mongodb");
var message_1 = __importDefault(require("../models/message"));
var user_1 = __importDefault(require("../models/user"));
exports.default = {
    Query: {
        user: function (_parent, _a) {
            var username = _a.username;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, user_1.default.findOne({ username: username }).exec()];
                        case 1: return [2 /*return*/, (_b.sent())];
                    }
                });
            });
        },
        messages: function (_parent, _a) {
            var group_id = _a.group_id;
            return __awaiter(void 0, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, message_1.default.find({ group_id: group_id }).exec()];
                        case 1:
                            messages = _b.sent();
                            return [2 /*return*/, messages];
                    }
                });
            });
        },
    },
    Mutation: {
        createUser: function (_parent, _a) {
            var _b = _a.input, username = _b.username, password = _b.password, avatar = _b.avatar;
            return __awaiter(void 0, void 0, void 0, function () {
                var user;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            user = new user_1.default({
                                username: username,
                                password: password,
                                avatar: avatar,
                            });
                            return [4 /*yield*/, user.save()];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        },
        createMessage: function (_parent, _a) {
            var _b = _a.input, sender_id = _b.sender_id, group_id = _b.group_id, content = _b.content, mentions = _b.mentions, replyTo = _b.replyTo;
            return __awaiter(void 0, void 0, void 0, function () {
                var message;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!content) {
                                throw new apollo_server_koa_1.UserInputError('Message content cannot be empty');
                            }
                            message = new message_1.default({
                                sender_id: new mongodb_1.ObjectId(sender_id),
                                group_id: new mongodb_1.ObjectId(group_id),
                                content: content,
                                mentions: mentions,
                                replyTo: replyTo,
                            });
                            return [4 /*yield*/, message.save()];
                        case 1:
                            _c.sent();
                            // const sender = await UserModel.findById(sender_id);
                            // if (sender) {
                            //   message.sender_id = new ObjectId(sender_id);
                            // }
                            return [2 /*return*/, message];
                    }
                });
            });
        },
    },
};
