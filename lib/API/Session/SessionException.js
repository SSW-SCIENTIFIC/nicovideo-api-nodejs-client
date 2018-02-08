"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../../Model/Common/Exception");
class SessionException extends Exception_1.default {
}
exports.SessionException = SessionException;
(function (SessionException) {
    let Code;
    (function (Code) {
        Code[Code["LOGIN_FAILURE"] = 0] = "LOGIN_FAILURE";
    })(Code = SessionException.Code || (SessionException.Code = {}));
    function ErrorMessage(code) {
        switch (code) {
            case Code.LOGIN_FAILURE:
                return "Login Failure.";
            default:
                return "Unknown Error.";
        }
    }
    SessionException.ErrorMessage = ErrorMessage;
})(SessionException = exports.SessionException || (exports.SessionException = {}));
exports.default = SessionException;
//# sourceMappingURL=SessionException.js.map