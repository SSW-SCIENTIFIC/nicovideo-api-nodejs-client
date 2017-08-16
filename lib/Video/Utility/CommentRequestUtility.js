"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comment = require("../CommentRequest");
class CommentRequestUtility {
    static createCommentRequest(watchData, options) {
        return this.createGeneralCommentRequest(watchData.thread.ids.default);
    }
    static createGeneralCommentRequest(threadId, options = {}) {
        // Default values
        options.version = options.version || Comment.CommentVersion.V20090904;
        options.language = options.language || Comment.Language.JAPANESE;
        options.withGlobal = options.withGlobal || false;
        options.scores = options.scores || true;
        options.nicoru = options.nicoru || false;
        const result = [];
        const thread = {
            thread: threadId,
            version: options.version,
            language: options.language,
            with_global: options.withGlobal ? 1 : 0,
            scores: options.scores ? 1 : 0,
            nicoru: options.nicoru ? 1 : 0,
        };
        switch (options.version) {
            case Comment.CommentVersion.V20061206:
                if (options.res_from) {
                    thread.res_from = options.res_from;
                }
                result.push({ thread: thread });
                break;
            case Comment.CommentVersion.V20090904:
                const threadLeaves = Object.assign({}, thread);
                if (options.content && options.content.match(/^(?:0|[1-9][0-9]*)-(?:0|[1-9][0-9]*):(?:0|[1-9][0-9]*),(?:0|[1-9][0-9]*)$/)) {
                    threadLeaves.content = options.content;
                }
                result.push({ thread: thread }, { thread_leaves: threadLeaves });
                break;
            default:
        }
        if (options.when && options.waybackkey && options.user_id) {
            result.forEach((value, index) => {
                const common = value.thread
                    || value.thread_leaves;
                common.when = options.when;
                common.waybackkey = options.waybackkey;
                common.user_id = options.user_id;
            });
        }
        return result;
    }
}
exports.CommentRequestUtility = CommentRequestUtility;
//# sourceMappingURL=CommentRequestUtility.js.map