import * as Request from "request";
import * as RequestPromise from "request-promise";

import { Session } from "../Session/Session";

export class Comment {
    private request: typeof RequestPromise;

    public constructor(private session: Session) {
        this.request = RequestPromise.defaults({ jar: this.session.jar });
    }

    public getComment(messageUrl: string, threadId: string) {

    }
}
