import ToughCookie from "tough-cookie";
export declare type ToughCookieJar = typeof ToughCookie.CookieJar;
/**
 * Class representing a session for NicoNico Video.
 */
export declare class Session {
    private cookieJar;
    private active;
    private email;
    private request;
    readonly jar: any;
    /**
     * @constructor
     * @param {ToughCookieJar} cookieJar
     */
    constructor(cookieJar?: ToughCookieJar);
    /**
     * Login to NicoNico Video.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
    /**
     * @returns {boolean} This getter returns if this session is active.
     */
    readonly isActive: boolean;
    /**
     *
     * @returns {string}
     */
    toJSON(): string;
    /**
     *
     * @param {string} serialized
     */
    fromJSON(serialized: string): void;
}
