import * as Comment from "../CommentRequest";
import {convertRuleOptions} from "tslint/lib/configuration";
import {WatchData} from "../../Common/WatchData";

export interface CommentRequestUtilityOptions {
    version?: Comment.CommentVersion;
    language?: Comment.Language;
    withGlobal?: boolean;
    scores?: boolean;
    nicoru?: boolean;

    waybackkey?: string;
    when?: number;
    user_id?: number;

    res_from?: number;

    content?: string;
}

export class CommentRequestUtility {
    public static createCommentRequest(watchData: WatchData, options: CommentRequestUtilityOptions): Comment.CommentRequest {
        return this.createGeneralCommentRequest(watchData.thread.ids.default);
    }

    public static createGeneralCommentRequest(threadId: number, options: CommentRequestUtilityOptions = {}): Comment.CommentRequest {
        // Default values
        options.version = options.version || Comment.CommentVersion.V20090904;
        options.language = options.language || Comment.Language.JAPANESE;
        options.withGlobal = options.withGlobal || false;
        options.scores = options.scores || true;
        options.nicoru = options.nicoru || false;

        const result: Comment.CommentRequest = [];

        const thread: Comment.CommentRequestCommon = {
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
                const threadLeaves: Comment.CommentRequestCommon = Object.assign({}, thread);

                if (options.content && options.content.match(/^(?:0|[1-9][0-9]*)-(?:0|[1-9][0-9]*):(?:0|[1-9][0-9]*),(?:0|[1-9][0-9]*)$/)) {
                    threadLeaves.content = options.content;
                }

                result.push({ thread: thread }, { thread_leaves: threadLeaves });

                break;
            default:
        }

        if (options.when && options.waybackkey && options.user_id) {
            result.forEach((value, index: number) => {
                const common: Comment.CommentRequestCommon
                    = (<{thread: Comment.CommentRequestCommon}>value).thread
                    || (<{thread_leaves: Comment.CommentRequestCommon}>value).thread_leaves;

                common.when = options.when;
                common.waybackkey = options.waybackkey;
                common.user_id = options.user_id;
            });
        }

        return result;
    }
}