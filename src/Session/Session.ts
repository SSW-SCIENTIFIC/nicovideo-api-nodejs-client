import axios, * as Axios from "axios";
import axiosCookieJarSupport from "@3846masa/axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

import { Session as SessionAPI } from "../APIEntryPoints";
import * as APIUrl from "../APIUrls";
import SessionException from "./SessionException";
import { MyListResponse } from "../MyList/MyList";

/**
 * Class representing a session for NicoNico Video.
 */
export class Session {
    private active: boolean;
    private email: string;

    /**
     * @constructor
     * @param {AxiosInstance} client axios http client used internally.
     */
    public constructor(
        public readonly client: Axios.AxiosInstance = axiosCookieJarSupport(axios.create({ jar: new CookieJar() }))
    ) {
        // do nothing
    }

    /**
     * Login to NicoNico Video.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    public async login(email: string, password: string): Promise<void> {
        await this.client.request(SessionAPI.createLoginRequest(email, password));
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
