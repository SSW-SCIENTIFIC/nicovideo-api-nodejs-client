"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    /**
     * Exception constructor.
     * @param {string} message
     * @param {number} code
     * @param {Exception|null} previous
     */
    constructor(message = "", code = 0, previous = null) {
        super(message);
        this.code = code;
        this.previous = previous;
    }
    toString() {
        return this.code + ": " + this.message;
    }
}
exports.Exception = Exception;
exports.default = Exception;
//# sourceMappingURL=Exception.js.map