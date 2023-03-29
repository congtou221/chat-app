"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'test',
    entities: ['src/models/**/*.ts'],
    synchronize: true,
};
