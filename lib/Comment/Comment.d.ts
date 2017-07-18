import { Session } from "../Session/Session";
export declare class Comment {
    private session;
    private request;
    constructor(session: Session);
    getComment(messageUrl: string, threadId: string): void;
}
