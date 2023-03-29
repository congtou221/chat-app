"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = void 0;
var apollo_server_koa_1 = require("apollo-server-koa");
var type_graphql_1 = require("type-graphql");
var message_1 = __importStar(require("../models/message"));
var user_1 = __importDefault(require("../models/user"));
var MessageResolver = exports.MessageResolver = /** @class */ (function () {
    function MessageResolver() {
    }
    MessageResolver.prototype.messages = function (_a) {
        var group_id = _a.group_id;
        return __awaiter(this, void 0, void 0, function () {
            var messages;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, message_1.default.find({ group_id: group_id }).populate('sender_id').exec()];
                    case 1:
                        messages = _b.sent();
                        return [2 /*return*/, messages];
                }
            });
        });
    };
    MessageResolver.prototype.createMessage = function (_a, _b, _c, _d, _e) {
        var sender_id = _a.sender_id;
        var group_id = _b.group_id;
        var content = _c.content;
        var _f = _d === void 0 ? {} : _d, mentions = _f.mentions;
        var _g = _e === void 0 ? {} : _e, reply_to = _g.reply_to;
        return __awaiter(this, void 0, void 0, function () {
            var message, sender;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!content) {
                            throw new apollo_server_koa_1.UserInputError('Message content cannot be empty');
                        }
                        message = new message_1.default({
                            sender_id: sender_id,
                            group_id: group_id,
                            content: content,
                            mentions: mentions,
                            reply_to: reply_to,
                        });
                        return [4 /*yield*/, message.save()];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, user_1.default.findById(sender_id)];
                    case 2:
                        sender = _h.sent();
                        if (sender) {
                            message.sender_id = sender_id;
                        }
                        return [2 /*return*/, message];
                }
            });
        });
    };
    __decorate([
        (0, type_graphql_1.Query)(function () { return [message_1.Message]; }),
        __param(0, (0, type_graphql_1.Args)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MessageResolver.prototype, "messages", null);
    __decorate([
        (0, type_graphql_1.Mutation)(function () { return message_1.Message; }),
        __param(0, (0, type_graphql_1.Args)()),
        __param(1, (0, type_graphql_1.Args)()),
        __param(2, (0, type_graphql_1.Args)()),
        __param(3, (0, type_graphql_1.Args)()),
        __param(4, (0, type_graphql_1.Args)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], MessageResolver.prototype, "createMessage", null);
    MessageResolver = __decorate([
        (0, type_graphql_1.Resolver)(message_1.Message)
    ], MessageResolver);
    return MessageResolver;
}());
