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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var type_graphql_1 = require("type-graphql");
var Message = exports.Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        (0, type_graphql_1.Field)(function () { return type_graphql_1.ID; }),
        __metadata("design:type", mongoose_1.Types.ObjectId)
    ], Message.prototype, "sender_id", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return type_graphql_1.ID; }),
        __metadata("design:type", mongoose_1.Types.ObjectId)
    ], Message.prototype, "group_id", void 0);
    __decorate([
        (0, type_graphql_1.Field)(),
        __metadata("design:type", String)
    ], Message.prototype, "content", void 0);
    __decorate([
        (0, type_graphql_1.Field)(),
        __metadata("design:type", Date)
    ], Message.prototype, "sent_at", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return type_graphql_1.ID; }, { nullable: true }),
        __metadata("design:type", mongoose_1.Types.ObjectId)
    ], Message.prototype, "reply_to", void 0);
    Message = __decorate([
        (0, type_graphql_1.ObjectType)()
    ], Message);
    return Message;
}());
var MessageSchema = new mongoose_1.Schema({
    // id: { type: Schema.Types.ObjectId, required: true, unique: true },
    sender_id: { type: mongoose_1.Schema.Types.ObjectId, required: false, ref: 'User' },
    group_id: { type: mongoose_1.Schema.Types.ObjectId, required: false, ref: 'Group' },
    content: { type: String, required: true },
    sent_at: { type: Date, default: Date.now },
    reply_to: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' },
});
exports.default = mongoose_1.default.model('Message', MessageSchema);
