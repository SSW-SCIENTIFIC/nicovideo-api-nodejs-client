"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const axios_cookiejar_support_1 = require("@3846masa/axios-cookiejar-support");
const tough_cookie_1 = require("tough-cookie");
const APIEntryPoints_1 = require("../APIEntryPoints");
/**
 * Class representing a session for NicoNico Video.
 */
class Session {
    /**
     * @constructor
     * @param {string} email
     * @param {string} password
     * @param {AxiosInstance} client axios http client used internally.
     */
    constructor(email = "", password = "", client = axios_cookiejar_support_1.default(axios_1.default.create({ jar: new tough_cookie_1.CookieJar() }))) {
        this.email = email;
        this.password = password;
        this.client = client;
        // do nothing
    }
    /**
     * Login to NicoNico Video.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    async login(email, password) {
        this.email = email || this.email;
        this.password = password || this.password;
        await this.client.request(APIEntryPoints_1.Session.createLoginRequest(this.email, this.password));
    }
    /**
     * Logout from NicoNico Video.
     * @returns {Promise<void>}
     */
    async logout() {
        await this.client.request(APIEntryPoints_1.Session.createLogoutRequest());
    }
    /**
     * Check the session is active.
     * @returns {Promise<boolean>} This getter returns if this session is active.
     */
    async isActive() {
        const result = (await this.client.request(APIEntryPoints_1.Session.createCheckActiveRequest())).data;
        return result.status === "ok";
    }
}
exports.Session = Session;
//# sourceMappingURL=Session.js.map