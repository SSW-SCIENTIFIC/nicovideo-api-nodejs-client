export declare enum CommentVersion {
    V20061206 = "20061206",
    V20090904 = "20090904",
}
export declare enum Language {
    JAPANESE = 0,
}
export declare type CommentRequest = Array<{
    thread: CommentRequestCommon;
} | {
    thread_leaves: CommentRequestCommon;
}>;
export interface CommentRequestCommon {
    thread: number;
    version: CommentVersion;
    language: Language;
    with_global: number;
    scores: number;
    nicoru: number;
    force_184?: number;
    threadkey?: string;
    waybackkey?: string;
    when?: number;
    user_id?: number;
    fork?: number;
    res_from?: number;
    content?: string;
}
export interface OfficialCommentRequestCommon {
    force_184: number;
    threadkey: string;
}
export interface CommentWaybackRequestCommon {
    waybackkey: string;
    when: number;
    user_id: string;
}
