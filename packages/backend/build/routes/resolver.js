"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rootValue = {
    hello: function () { return 'Hello, World!'; },
    user: function (_a) {
        var id = _a.id;
        return ({ id: id, name: 'John Doe', email: 'johndoe@example.com' });
    },
};
exports.default = rootValue;
