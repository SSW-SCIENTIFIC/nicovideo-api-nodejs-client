"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    constructor(message = "", code = 0, previous = null) {
        super(message);
        this.code = code;
        this.previous = previous;
    }
    toString() {
        return this.code + ": " + this.message;
    }
}
exports.default = Exception;
//# sourceMappingURL=Exception.js.map