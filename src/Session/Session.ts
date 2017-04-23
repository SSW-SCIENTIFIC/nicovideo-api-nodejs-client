import * as Request from "request-promise";
import ToughCookie from "tough-cookie";

type Cookie = typeof ToughCookie.Cookie;
type ToughCookieJar = typeof ToughCookie.CookieJar;

/**
 * Class representing a session for NicoNico Video.
 */
export class Session {
    private active: boolean;
    private email: string;

    public get jar() {
        return this.cookieJar;
    }

    /**
     * constructor
     */
    public constructor(private cookieJar: ToughCookieJar = Request.jar()) {
        this.active = false;
    }

    /**
     * Login to NicoNico Video.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    public async login(email: string, password: string) {
        return Request({
            method: "POST",
            uri: "https://secure.nicovideo.jp/secure/login",
            form: {
                mail_tel: email,
                password: password,
            },
            jar: this.cookieJar,
            simple: false,
        }).then((response) => {
            let count = this.cookieJar.getCookies("https://secure.nicovideo.jp")
                .filter((cookie: Cookie, index: number) => cookie.key === "user_session").length;

            if (count === 0) {
                return Promise.reject("Failed to Login.");
            }

            this.email = email;
            this.active = true;

            return Promise.resolve();
        });
    }

    /**
     * @returns {boolean} This getter returns if this session is active.
     */
    public get isActive() {
        return this.active;
    }

    /**
     *
     * @returns {string}
     */
    public toJSON() {
        if (!this.isActive) {
            throw new Error("Session is not logged in.");
        }

        return JSON.stringify(this.cookieJar);
    }

    /**
     *
     * @param {string} serialized
     */
    public fromJSON(serialized: string) {
        this.cookieJar = JSON.parse(serialized);
        this.active = true;
    }
}