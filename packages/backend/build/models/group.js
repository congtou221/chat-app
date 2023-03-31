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
exports.Group = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var type_graphql_1 = require("type-graphql");
var Group = exports.Group = /** @class */ (function () {
    function Group() {
    }
    __decorate([
        (0, type_graphql_1.Field)(),
        __metadata("design:type", String)
    ], Group.prototype, "name", void 0);
    __decorate([
        (0, type_graphql_1.Field)({ nullable: true }),
        __metadata("design:type", String)
    ], Group.prototype, "description", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return type_graphql_1.ID; }),
        __metadata("design:type", mongoose_1.Types.ObjectId)
    ], Group.prototype, "ownerId", void 0);
    __decorate([
        (0, type_graphql_1.Field)(),
        __metadata("design:type", Date)
    ], Group.prototype, "createdAt", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return type_graphql_1.ID; }),
        __metadata("design:type", Array)
    ], Group.prototype, "members", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return type_graphql_1.ID; }),
        __metadata("design:type", Array)
    ], Group.prototype, "messages", void 0);
    Group = __decorate([
        (0, type_graphql_1.ObjectType)()
    ], Group);
    return Group;
}());
var GroupSchema = new mongoose_1.Schema({
    // id: { type: Schema.Types.ObjectId, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    members: { type: [mongoose_1.Schema.Types.ObjectId], default: [], required: true },
    messages: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
});
exports.default = mongoose_1.default.model('Group', GroupSchema);
