"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception = (function (_super) {
    __extends(Exception, _super);
    function Exception(message, code, previous) {
        if (message === void 0) { message = ""; }
        if (code === void 0) { code = 0; }
        if (previous === void 0) { previous = null; }
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.previous = previous;
        return _this;
    }
    Exception.prototype.toString = function () {
        return this.code + ": " + this.message;
    };
    return Exception;
}(Error));
exports.default = Exception;
