"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request");
const RequestPromise = require("request-promise");
const APIEntryPoints_1 = require("../APIEntryPoints");
const APIUrl = require("../APIUrls");
const SessionException_1 = require("./SessionException");
/**
 * Class representing a session for NicoNico Video.
 */
class Session {
    /**
     * @constructor
     * @param {ToughCookieJar} cookieJar
     */
    constructor(cookieJar = Request.jar()) {
        this.cookieJar = cookieJar;
        this.active = false;
        this.request = RequestPromise.defaults({ jar: this.jar });
    }
    get jar() {
        return this.cookieJar;
    }
    /**
     * Login to NicoNico Video.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    async login(email, password) {
        return this.request(APIEntryPoints_1.Session.login(email, password)).then(() => {
            let count = this.cookieJar.getCookies(APIUrl.LOGIN)
                .filter((cookie, index) => cookie.key === "user_session").length;
            if (count === 0) {
                throw new SessionException_1.default("Failed to Login.");
            }
            this.email = email;
            this.active = true;
            return Promise.resolve();
        });
    }
    async logout() {
        return this.request(APIEntryPoints_1.Session.logout());
    }
    /**
     * @returns {boolean} This getter returns if this session is active.
     */
    get isActive() {
        return this.active;
    }
    /**
     *
     * @returns {string}
     */
    toJSON() {
        if (!this.isActive) {
            throw new Error("Session is not logged in.");
        }
        return JSON.stringify(this.cookieJar);
    }
    /**
     *
     * @param {string} serialized
     */
    fromJSON(serialized) {
        this.cookieJar = JSON.parse(serialized);
        this.active = true;
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map