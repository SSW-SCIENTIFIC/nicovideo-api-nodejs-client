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
     * @param {(session: Session, url: string) => boolean} onMultiFactorAuthentication Callback for multi-factor-authentication
     * @returns {Promise<void>}
     */
    login(email?: string, password?: string, onMultiFactorAuthentication?: Session.MultiFactorAuthenticationHandler): Promise<void>;
    /**
     * Login to NicoNico Video.
     * @param {(session: Session, url: string) => boolean} onMultiFactorAuthentication Callback for multi-factor-authentication
     * @returns {Promise<void>}
     */
    login(onMultiFactorAuthentication?: Session.MultiFactorAuthenticationHandler): Promise<void>;
    /**
     * Traits Multi Factor Authentication.
     * @param {string} url
     * @param {string} oneTimePad
     * @param {boolean} trust
     * @param {string} deviceName
     * @returns {Promise<void>}
     */
    loginMultiFactorAuthentication(url: string, oneTimePad: string, trust?: boolean, deviceName?: string): Promise<void>;
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
export declare namespace Session {
    type MultiFactorAuthenticationHandler = ((session: Session, url: string) => boolean) | ((session: Session, url: string) => Promise<boolean>);
}
export default Session;
