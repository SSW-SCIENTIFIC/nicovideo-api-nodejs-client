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
    public static createCommentRequest(watchData: WatchData): Comment.CommentRequest {
        if (watchData.video.isOfficial) {

        }
    }

    public static createGeneralCommentRequest(
        threadId: number,
        options: CommentRequestUtilityOptions = {},
    ): Comment.CommentRequest {
        options.version = options.version || Comment.CommentVersion.V20090904;
        options.language = options.language || Comment.Language.JAPANESE;
        options.withGlobal = options.withGlobal || false;
        options.scores = options.scores || true;
        options.nicoru = options.nicoru || false;

        const thread: Comment.CommentRequestCommon = {
            thread: threadId,
            version: options.version || options.version,
            language: options.language,
            with_global: options.withGlobal ? 1 : 0,
            scores: options.scores ? 1 : 0,
            nicoru: options.nicoru ? 1 : 0,
        };

        if (options.when && options.waybackkey && options.user_id) {
            thread.when = options.when;
            thread.waybackkey = options.waybackkey;
            thread.user_id = options.user_id;
        }

        if (options.version === Comment.CommentVersion.V20061206) {
            if (options.res_from) {
                thread.res_from = options.res_from;
            }

            return [{ thread: thread }];
        }

        if (options.version === Comment.CommentVersion.V20090904) {
            if (options.content && options.content.match(/^(?:0|[1-9][0-9]*)-(?:0|[1-9][0-9]*):(?:0|[1-9][0-9]*),(?:0|[1-9][0-9]*)$/)) {
                thread.content = options.content;
            }
        }

        return [];
    }
}