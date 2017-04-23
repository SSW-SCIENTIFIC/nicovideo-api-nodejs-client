import * as info from "../../privates";

import { Session } from "../../src/Session/Session";

describe("Session", () => {
    let email: string;
    let password: string;

    before(() => {
        email = info.email;
        password = info.password;
    });

    it("should succeed login with valid account", async (done) => {
        let session = new Session();
        session.login(email, password).then(done()).catch(() => process.on("unHandledRejection", console.dir));
    });
});
