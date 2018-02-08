import axios, * as Axios from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

import { Session as SessionAPI } from "../APIEntryPoints";
import * as APIUrl from "../APIUrls";
import SessionException from "./SessionException";
import { MyListResponse } from "../MyList/MyList";
import { LoginResult, LoginResultStatus } from "./LoginResult";

/**
 * Class representing a session for NicoNico Video.
 */
export class Session {
    /**
     * @constructor
     * @param {string} email
     * @param {string} password
     * @param {AxiosInstance} client axios http client used internally.
     */
    public constructor(
        private email: string = "",
        private password: string = "",
        public readonly client: Axios.AxiosInstance = axiosCookieJarSupport(axios.create()),
    ) {
        this.client.defaults = { jar: new CookieJar() };
    }

    /**
     * Login to NicoNico Video.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    public async login(email?: string, password?: string): Promise<LoginResult> {
        this.email = email || this.email;
        this.password = password || this.password;

        const response = await this.client.request(SessionAPI.createLoginRequest(this.email, this.password));

        // check whether authentication success/failure or MFA required
        if (response.headers["x-niconico-authflag"] == 0) {
            // MFA is required
            if (response.config.url && response.config.url.indexOf(APIUrl.LOGIN_MFA) !== -1) {
                return {
                    status: LoginResultStatus.MULTI_FACTOR,
                    url: response.config.url,
                };
            }

            return { status: LoginResultStatus.FAILURE };
        }

        return { status: LoginResultStatus.SUCCESS };
    }

    public async loginMultiFactorAuthentication(url: string, oneTimePad: string, trust: boolean = false, deviceName?: string): Promise<boolean> {
        const response = await this.client.request(SessionAPI.createMultiFactorAuthenticationRequest(url, oneTimePad, trust, deviceName));
        return response.headers["x-niconico-authflag"] != 0;
    }

    /**
     * Logout from NicoNico Video.
     * @returns {Promise<void>}
     */
    public async logout(): Promise<void> {
        await this.client.request(SessionAPI.createLogoutRequest());
    }

    /**
     * Check the session is active.
     * @returns {Promise<boolean>} This getter returns if this session is active.
     */
    public async isActive(): Promise<boolean> {
        const result: MyListResponse = (await this.client.request(SessionAPI.createCheckActiveRequest())).data;
        return result.status === "ok";
    }
}
