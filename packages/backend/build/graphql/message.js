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
exports.getMessageObjList = void 0;
var apollo_server_koa_1 = require("apollo-server-koa");
var mongodb_1 = require("mongodb");
var group_1 = __importDefault(require("../models/group"));
var message_1 = __importDefault(require("../models/message"));
var message_mention_1 = __importDefault(require("../models/message_mention"));
var user_1 = __importDefault(require("../models/user"));
var getMessageObjList = function (messages) { return __awaiter(void 0, void 0, void 0, function () {
    var newMessages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newMessages = messages.map(function (message) { return __awaiter(void 0, void 0, void 0, function () {
                    var id, content, mentions, replyTo, senderId, sentAt, groupId, ownerPromise, replyToPromise, mentionsPromise, _a, senderObj, replyMessages, mentionsObjList, newMentionsObj;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                id = message._id, content = message.content, mentions = message.mentions, replyTo = message.replyTo, senderId = message.senderId, sentAt = message.sentAt, groupId = message.groupId;
                                ownerPromise = new Promise(function (resolve) {
                                    user_1.default.findById(new mongodb_1.ObjectId(senderId))
                                        .exec()
                                        .then(function (v) { return resolve(v); });
                                });
                                replyToPromise = new Promise(function (resolve) {
                                    message_1.default.find({ _id: { $in: replyTo } })
                                        .exec()
                                        .then(function (v) { return resolve(v); });
                                });
                                mentionsPromise = new Promise(function (resolve) {
                                    message_mention_1.default.find({ _id: { $in: mentions } })
                                        .exec()
                                        .then(function (v) {
                                        resolve(v);
                                    });
                                });
                                return [4 /*yield*/, Promise.all([
                                        ownerPromise,
                                        replyToPromise,
                                        mentionsPromise,
                                    ])];
                            case 1:
                                _a = _c.sent(), senderObj = _a[0], replyMessages = _a[1], mentionsObjList = _a[2];
                                newMentionsObj = mentionsObjList.map(function (mentionsObj) { return __awaiter(void 0, void 0, void 0, function () {
                                    var content, userId, userPromise, user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                content = mentionsObj.content, userId = mentionsObj.userId;
                                                userPromise = new Promise(function (resolve) {
                                                    user_1.default.findById(new mongodb_1.ObjectId(userId))
                                                        .exec()
                                                        .then(function (v) { return resolve(v); });
                                                });
                                                return [4 /*yield*/, userPromise];
                                            case 1:
                                                user = _a.sent();
                                                return [2 /*return*/, {
                                                        content: content,
                                                        user: user,
                                                    }];
                                        }
                                    });
                                }); });
                                _b = {
                                    id: id,
                                    groupId: groupId,
                                    content: content,
                                    sender: senderObj,
                                    replyTo: replyMessages
                                };
                                return [4 /*yield*/, Promise.all(newMentionsObj)];
                            case 2: return [2 /*return*/, (_b.mentions = _c.sent(),
                                    _b.sentAt = sentAt,
                                    _b)];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(newMessages)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getMessageObjList = getMessageObjList;
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
        friends: function (_parent, _a) {
            var username = _a.username;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, friends, newFriends;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, user_1.default.findOne({ username: username }).exec()];
                        case 1:
                            _b = (_c.sent()).friends, friends = _b === void 0 ? [] : _b;
                            newFriends = friends.map(function (friendId) { return __awaiter(void 0, void 0, void 0, function () {
                                var _a, username, _id, friends, avatar;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, user_1.default.findOne({ _id: friendId }).exec()];
                                        case 1:
                                            _a = (_b.sent()) || {}, username = _a.username, _id = _a._id, friends = _a.friends, avatar = _a.avatar;
                                            return [2 /*return*/, {
                                                    username: username,
                                                    friends: friends,
                                                    avatar: avatar,
                                                    id: _id,
                                                }];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(newFriends)];
                        case 2: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        },
        messages: function (_parent, _a) {
            var groupId = _a.groupId;
            return __awaiter(void 0, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, message_1.default.find({ groupId: groupId }).exec()];
                        case 1:
                            messages = _b.sent();
                            return [4 /*yield*/, (0, exports.getMessageObjList)(messages)];
                        case 2: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        groups: function (_parent, _a) {
            var userId = _a.userId;
            return __awaiter(void 0, void 0, void 0, function () {
                var groups, newGroup;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, group_1.default.find({ members: { $in: [new mongodb_1.ObjectId(userId)] } }).exec()];
                        case 1:
                            groups = _b.sent();
                            newGroup = groups.map(function (group) { return __awaiter(void 0, void 0, void 0, function () {
                                var _id, id, memberIds, messageIds, name, description, ownerId, createdAt, ownerPromise, memberPromise, messagePromise, _a, owner, matchedMembers, matchedMesssages;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _id = group._id, id = group.id, memberIds = group.members, messageIds = group.messages, name = group.name, description = group.description, ownerId = group.ownerId, createdAt = group.createdAt;
                                            ownerPromise = new Promise(function (resolve) {
                                                user_1.default.findOne({ _id: ownerId })
                                                    .exec()
                                                    .then(function (v) { return resolve(v); });
                                            });
                                            memberPromise = new Promise(function (resolve) {
                                                user_1.default.find({ _id: { $in: memberIds } })
                                                    .exec()
                                                    .then(function (v) { return resolve(v); });
                                            });
                                            messagePromise = new Promise(function (resolve) {
                                                message_1.default.find({ _id: { $in: messageIds } })
                                                    .exec()
                                                    .then(function (v) { return resolve(v); });
                                            });
                                            return [4 /*yield*/, Promise.all([
                                                    ownerPromise,
                                                    memberPromise,
                                                    messagePromise,
                                                ])];
                                        case 1:
                                            _a = _c.sent(), owner = _a[0], matchedMembers = _a[1], matchedMesssages = _a[2];
                                            _b = {
                                                id: id,
                                                members: matchedMembers
                                            };
                                            return [4 /*yield*/, (0, exports.getMessageObjList)(matchedMesssages)];
                                        case 2: return [2 /*return*/, (_b.messages = _c.sent(),
                                                _b.ownerId = owner,
                                                _b.name = name,
                                                _b.description = description,
                                                _b.createdAt = createdAt,
                                                _b)];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(newGroup)];
                        case 2: return [2 /*return*/, _b.sent()];
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
            var _b = _a.input, senderId = _b.senderId, groupId = _b.groupId, content = _b.content, mentions = _b.mentions, replyTo = _b.replyTo;
            return __awaiter(void 0, void 0, void 0, function () {
                var message;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!content) {
                                throw new apollo_server_koa_1.UserInputError('Message content cannot be empty');
                            }
                            message = new message_1.default({
                                senderId: new mongodb_1.ObjectId(senderId),
                                groupId: new mongodb_1.ObjectId(groupId),
                                content: content,
                                mentions: mentions,
                                replyTo: replyTo,
                            });
                            return [4 /*yield*/, message.save()];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, message];
                    }
                });
            });
        },
        createGroup: function (_parent, _a) {
            var _b = _a.input, name = _b.name, description = _b.description, owner_id = _b.owner_id, members = _b.members, messages = _b.messages;
            return __awaiter(void 0, void 0, void 0, function () {
                var group;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            group = new group_1.default({
                                name: name,
                                description: description,
                                owner_id: new mongodb_1.ObjectId(owner_id),
                                members: members.map(function (m) { return new mongodb_1.ObjectId(m); }),
                                messages: messages.map(function (m) { return new mongodb_1.ObjectId(m); }),
                            });
                            return [4 /*yield*/, group.save()];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, group];
                    }
                });
            });
        },
        createMessageMention: function (_parent, _a) {
            var _b = _a.input, userId = _b.userId, content = _b.content;
            return __awaiter(void 0, void 0, void 0, function () {
                var messageMention;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            messageMention = new message_mention_1.default({
                                userId: new mongodb_1.ObjectId(userId),
                                content: content,
                            });
                            return [4 /*yield*/, messageMention.save()];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, messageMention];
                    }
                });
            });
        },
    },
};
