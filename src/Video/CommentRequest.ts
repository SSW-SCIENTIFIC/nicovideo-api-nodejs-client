export enum CommentVersion {
    V20061206 = "20061206",
    V20090904 = "20090904",
}

export enum Language {
    JAPANESE = 0,
}

export type CommentRequest
    = Array<{ thread: OfficialCommentThreadRequest } | { thread_leaves: OfficialCommentThreadLeavesRequest }>
        | Array<{ thread: GeneralCommentThreadRequest } | { thread_leaves: GeneralCommentThreadLeavesRequest }>;

export interface OfficialCommentThreadRequest {
    thread: string;
    version: CommentVersion;
    language: Language; // 0 for japanese?
    user_id: string;
    with_global: number; // always 1?
    scores: number; // always 1?
    nicoru: number; // always 0?
    userkey: string;
}

export interface OfficialCommentThreadLeavesRequest {
    thread: string;
    language: Language;
    user_id: string;
    content: string;
    scores: number;
    nicoru: number;
    userkey: string;
}

export interface GeneralCommentThreadRequest {
    thread: number;
    version: CommentVersion;
    language: Language;
    user_id: number;
    with_global: number;
    scores: number;
    nicoru: number;
    userkey: string;
}

export interface GeneralCommentThreadLeavesRequest {
    thread: number;
    language: Language;
    user_id: number;
    content: string;
    scores: number;
    nicoru: number;
    userkey: string;
}
