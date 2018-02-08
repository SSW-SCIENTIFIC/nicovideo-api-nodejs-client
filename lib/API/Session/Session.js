"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const axios_cookiejar_support_1 = require("@3846masa/axios-cookiejar-support");
const tough_cookie_1 = require("tough-cookie");
const APIEntryPoints_1 = require("../APIEntryPoints");
const APIUrl = require("../APIUrls");
const LoginResult_1 = require("./LoginResult");
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
    constructor(email = "", password = "", client = axios_cookiejar_support_1.default(axios_1.default.create())) {
        this.email = email;
        this.password = password;
        this.client = client;
        this.client.defaults = { jar: new tough_cookie_1.CookieJar() };
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
        const response = await this.client.request(APIEntryPoints_1.Session.createLoginRequest(this.email, this.password));
        // check whether authentication success/failure or MFA required
        if (response.headers["x-niconico-authflag"] == 0) {
            // MFA is required
            if (response.config.url && response.config.url.indexOf(APIUrl.LOGIN_MFA) !== -1) {
                return {
                    status: LoginResult_1.LoginResultStatus.MULTI_FACTOR,
                    url: response.config.url,
                };
            }
            return { status: LoginResult_1.LoginResultStatus.FAILURE };
        }
        return { status: LoginResult_1.LoginResultStatus.SUCCESS };
    }
    async loginMultiFactorAuthentication(url, oneTimePad, trust = false, deviceName) {
        const response = await this.client.request(APIEntryPoints_1.Session.createMultiFactorAuthenticationRequest(url, oneTimePad, trust, deviceName));
        return response.headers["x-niconico-authflag"] != 0;
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