import * as Request from "request-promise";
import * as RequestPromise from "request-promise";
import ToughCookie from "tough-cookie";

import { Session as SessionAPI } from "../APIEntryPoints";
import * as APIUrl from "../APIUrls";
import SessionException from "./SessionException";

type Cookie = typeof ToughCookie.Cookie;
type ToughCookieJar = typeof ToughCookie.CookieJar;

/**
 * Class representing a session for NicoNico Video.
 */
export class Session {
    private active: boolean;
    private email: string;
    private request: typeof RequestPromise;

    public get jar() {
        return this.cookieJar;
    }

    /**
     * @constructor
     * @param {ToughCookieJar} cookieJar
     */
    public constructor(private cookieJar: ToughCookieJar = Request.jar()) {
        this.active = false;
        this.request = RequestPromise.defaults({ jar: this.jar });
    }

    /**
     * Login to NicoNico Video.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    public async login(email: string, password: string): Promise<void> {
        return this.request(SessionAPI.login(email, password)).then(() => {
            let count = this.cookieJar.getCookies(APIUrl.LOGIN)
                .filter((cookie: Cookie, index: number) => cookie.key === "user_session").length;

            if (count === 0) {
                throw new SessionException("Failed to Login.");
            }

            this.email = email;
            this.active = true;

            return Promise.resolve();
        });
    }

    public async logout(): Promise<void> {
        return this.request(SessionAPI.logout());
    }

    /**
     * @returns {boolean} This getter returns if this session is active.
     */
    public get isActive(): boolean {
        return this.active;
    }

    /**
     *
     * @returns {string}
     */
    public toJSON(): string {
        if (!this.isActive) {
            throw new Error("Session is not logged in.");
        }

        return JSON.stringify(this.cookieJar);
    }

    /**
     *
     * @param {string} serialized
     */
    public fromJSON(serialized: string): void {
        this.cookieJar = JSON.parse(serialized);
        this.active = true;
    }
}
