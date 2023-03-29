"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeResolver = exports.createRecipeSamples = exports.RecipeInput = exports.Recipe = void 0;
var type_graphql_1 = require("type-graphql");
// import { RecipeInput } from './recipe-input';
// import { createRecipeSamples } from './recipe-samples';
// import { Recipe } from './recipe-type';
var Recipe = exports.Recipe = /** @class */ (function () {
    function Recipe() {
    }
    Object.defineProperty(Recipe.prototype, "specification", {
        get: function () {
            return this.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Recipe.prototype, "averageRating", {
        get: function () {
            var ratingsCount = this.ratings.length;
            if (ratingsCount === 0) {
                return null;
            }
            var ratingsSum = this.ratings.reduce(function (a, b) { return a + b; }, 0);
            return ratingsSum / ratingsCount;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, type_graphql_1.Field)(),
        __metadata("design:type", Object)
    ], Recipe.prototype, "title", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function (type) { return String; }, { nullable: true, deprecationReason: 'Use `description` field instead' }),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Recipe.prototype, "specification", null);
    __decorate([
        (0, type_graphql_1.Field)({ nullable: true, description: 'The recipe description with preparation info' }),
        __metadata("design:type", String)
    ], Recipe.prototype, "description", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function (type) { return [type_graphql_1.Int]; }),
        __metadata("design:type", Array)
    ], Recipe.prototype, "ratings", void 0);
    __decorate([
        (0, type_graphql_1.Field)(),
        __metadata("design:type", Object)
    ], Recipe.prototype, "creationDate", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function (type) { return type_graphql_1.Int; }),
        __metadata("design:type", Object)
    ], Recipe.prototype, "ratingsCount", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function (type) { return type_graphql_1.Float; }, { nullable: true }),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Recipe.prototype, "averageRating", null);
    Recipe = __decorate([
        (0, type_graphql_1.ObjectType)({ description: 'Object representing cooking recipe' })
    ], Recipe);
    return Recipe;
}());
var RecipeInput = exports.RecipeInput = /** @class */ (function () {
    function RecipeInput() {
    }
    __decorate([
        (0, type_graphql_1.Field)(),
        __metadata("design:type", Object)
    ], RecipeInput.prototype, "title", void 0);
    __decorate([
        (0, type_graphql_1.Field)({ nullable: true }),
        __metadata("design:type", String)
    ], RecipeInput.prototype, "description", void 0);
    RecipeInput = __decorate([
        (0, type_graphql_1.InputType)()
    ], RecipeInput);
    return RecipeInput;
}());
function createRecipeSamples() {
    return [
        createRecipe({
            description: 'Desc 1',
            title: 'Recipe 1',
            ratings: [0, 3, 1],
            creationDate: new Date('2018-04-11'),
        }),
        createRecipe({
            description: 'Desc 2',
            title: 'Recipe 2',
            ratings: [4, 2, 3, 1],
            creationDate: new Date('2018-04-15'),
        }),
        createRecipe({
            description: 'Desc 3',
            title: 'Recipe 3',
            ratings: [5, 4],
            creationDate: new Date(),
        }),
    ];
}
exports.createRecipeSamples = createRecipeSamples;
function createRecipe(recipeData) {
    return Object.assign(new Recipe(), recipeData);
}
var RecipeResolver = exports.RecipeResolver = /** @class */ (function () {
    function RecipeResolver() {
        this.items = createRecipeSamples();
    }
    RecipeResolver.prototype.recipe = function (title) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.items.find(function (recipe) { return recipe.title === title; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecipeResolver.prototype.recipes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.items];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RecipeResolver.prototype.addRecipe = function (recipeInput) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recipe = Object.assign(new Recipe(), {
                            description: recipeInput.description,
                            title: recipeInput.title,
                            ratings: [],
                            creationDate: new Date(),
                        });
                        return [4 /*yield*/, this.items.push(recipe)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, recipe];
                }
            });
        });
    };
    RecipeResolver.prototype.ratingsCount = function (recipe, minRate) {
        return recipe.ratings.filter(function (rating) { return rating >= minRate; }).length;
    };
    __decorate([
        (0, type_graphql_1.Query)(function (returns) { return Recipe; }, { nullable: true }),
        __param(0, (0, type_graphql_1.Arg)('title')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], RecipeResolver.prototype, "recipe", null);
    __decorate([
        (0, type_graphql_1.Query)(function (returns) { return [Recipe]; }, { description: 'Get all the recipes from around the world ' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RecipeResolver.prototype, "recipes", null);
    __decorate([
        (0, type_graphql_1.Mutation)(function (returns) { return Recipe; }),
        __param(0, (0, type_graphql_1.Arg)('recipe')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [RecipeInput]),
        __metadata("design:returntype", Promise)
    ], RecipeResolver.prototype, "addRecipe", null);
    __decorate([
        (0, type_graphql_1.FieldResolver)(),
        __param(0, (0, type_graphql_1.Root)()),
        __param(1, (0, type_graphql_1.Arg)('minRate', function (type) { return type_graphql_1.Int; }, { defaultValue: 0.0 })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Recipe, Number]),
        __metadata("design:returntype", Number)
    ], RecipeResolver.prototype, "ratingsCount", null);
    RecipeResolver = __decorate([
        (0, type_graphql_1.Resolver)(function (of) { return Recipe; })
    ], RecipeResolver);
    return RecipeResolver;
}());
