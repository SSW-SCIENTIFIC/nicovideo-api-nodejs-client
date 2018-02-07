import * as Axios from "axios";
/**
 * Class representing a session for NicoNico Video.
 */
export declare class Session {
    private email;
    private password;
    readonly client: Axios.AxiosInstance;
    /**
     * @constructor
     * @param {string} email
     * @param {string} password
     * @param {AxiosInstance} client axios http client used internally.
     */
    constructor(email?: string, password?: string, client?: Axios.AxiosInstance);
    /**
     * Login to NicoNico Video.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<void>}
     */
    login(email?: string, password?: string): Promise<void>;
    /**
     * Logout from NicoNico Video.
     * @returns {Promise<void>}
     */
    logout(): Promise<void>;
    /**
     * Check the session is active.
     * @returns {Promise<boolean>} This getter returns if this session is active.
     */
    isActive(): Promise<boolean>;
}
