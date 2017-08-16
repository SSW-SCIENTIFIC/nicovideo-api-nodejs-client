import * as Comment from "../CommentRequest";
import { WatchData } from "../../Common/WatchData";
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
export declare class CommentRequestUtility {
    static createCommentRequest(watchData: WatchData, options: CommentRequestUtilityOptions): Comment.CommentRequest;
    static createGeneralCommentRequest(threadId: number, options?: CommentRequestUtilityOptions): Comment.CommentRequest;
}
