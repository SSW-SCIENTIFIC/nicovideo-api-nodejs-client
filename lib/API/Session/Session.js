"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const axios_cookiejar_support_1 = require("@3846masa/axios-cookiejar-support");
const tough_cookie_1 = require("tough-cookie");
const APIEntryPoints_1 = require("../APIEntryPoints");
const APIUrl = require("../APIUrls");
const SessionException_1 = require("./SessionException");
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
        this.email = email || "";
        this.password = password || "";
    }
    async login(param, password, onMultiFactorAuthentication) {
        if (param instanceof Function) {
            onMultiFactorAuthentication = param;
        }
        else {
            this.email = param || this.email;
            this.password = password || this.password;
        }
        const response = await this.client.request(APIEntryPoints_1.Session.createLoginRequest(this.email, this.password));
        // check whether authentication success/failure or MFA required
        if (response.headers["x-niconico-authflag"] == 0) {
            // MFA is required
            if (response.config.url && response.config.url.indexOf(APIUrl.LOGIN_MFA) !== -1) {
                if (onMultiFactorAuthentication && await onMultiFactorAuthentication(this, response.config.url)) {
                    return;
                }
            }
            throw new SessionException_1.default(SessionException_1.default.ErrorMessage(SessionException_1.default.Code.LOGIN_FAILURE), SessionException_1.default.Code.LOGIN_FAILURE);
        }
        return;
    }
    async loginMultiFactorAuthentication(url, oneTimePad, trust = false, deviceName) {
        const response = await this.client.request(APIEntryPoints_1.Session.createMultiFactorAuthenticationRequest(url, oneTimePad, trust, deviceName));
        if (response.headers["x-niconico-authflag"] == 0) {
            throw new SessionException_1.default(SessionException_1.default.ErrorMessage(SessionException_1.default.Code.LOGIN_FAILURE), SessionException_1.default.Code.LOGIN_FAILURE);
        }
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
exports.default = Session;
//# sourceMappingURL=Session.js.map