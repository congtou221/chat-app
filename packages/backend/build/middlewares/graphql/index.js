"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var schema = (0, graphql_1.buildSchema)("\ntype Query {\n  hello: String\n  user(id: Int!): User\n}\ntype User {\n  id: Int\n  name: String\n  email: String\n}\n");
