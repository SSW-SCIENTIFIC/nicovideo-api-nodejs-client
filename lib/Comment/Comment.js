"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestPromise = require("request-promise");
class Comment {
    constructor(session) {
        this.session = session;
        this.request = RequestPromise.defaults({ jar: this.session.jar });
    }
    getComment(messageUrl, threadId) {
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map