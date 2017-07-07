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
    scores: string;
    nicoru: string;
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

[{"ping": {"content": "rs:0"}}, {"ping": {"content": "ps:0"}}, {
    "thread": {
        "thread": "1491806424",
        "version": "20090904",
        "language": 0,
        "user_id": 273108,
        "with_global": 1,
        "scores": 1,
        "nicoru": 0,
        "userkey": "1497803901.~1~i4dBwW50Uo2DzP_Wfzfj2RgjB8Bu9eloGPtwKbQDgDc"
    }
}, {"ping": {"content": "pf:0"}}, {"ping": {"content": "ps:1"}}, {
    "thread_leaves": {
        "thread": "1491806424",
        "language": 0,
        "user_id": 273108,
        "content": "0-24:100,1000",
        "scores": 1,
        "nicoru": 0,
        "userkey": "1497803901.~1~i4dBwW50Uo2DzP_Wfzfj2RgjB8Bu9eloGPtwKbQDgDc"
    }
}, {"ping": {"content": "pf:1"}}, {"ping": {"content": "ps:2"}}, {
    "thread": {
        "thread": "1491806425",
        "version": "20090904",
        "language": 0,
        "user_id": 273108,
        "force_184": "1",
        "with_global": 1,
        "scores": 1,
        "nicoru": 0,
        "threadkey": "1497803904.bg4uJ4-TSueYAnxYWvikMNLXHrM"
    }
}, {"ping": {"content": "pf:2"}}, {"ping": {"content": "ps:3"}}, {
    "thread_leaves": {
        "thread": "1491806425",
        "language": 0,
        "user_id": 273108,
        "content": "0-24:100,1000",
        "scores": 1,
        "nicoru": 0,
        "force_184": "1",
        "threadkey": "1497803904.bg4uJ4-TSueYAnxYWvikMNLXHrM"
    }
}, {"ping": {"content": "pf:3"}}, {"ping": {"content": "rf:0"}}]
