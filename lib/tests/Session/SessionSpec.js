"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = require("sinon");
const Session_1 = require("../../src/API/Session/Session");
describe("Session", () => {
    let server;
    setup(() => {
        server = sinon.fakeServer.create();
    });
    it("should succeed login with valid account", async (done) => {
        server.respondWith("POST", "https://account.nicovideo.jp/api/v1/login", [
            302,
            {
                "Set-Cookie": "user_session=deleted; Max-Age=0; Expires=Sat, 27 May 2017 15:41:53 GMT; Path=/",
            },
            "",
        ]);
        let session = new Session_1.Session();
        return await session.login("test", "password").catch((err) => {
            return err;
        });
    });
});
//# sourceMappingURL=SessionSpec.js.map