import * as Axios from "axios";
import { DmcSession } from "./Video/Dmc/DmcSession";
import { DmcSessionResult } from "./Video/Dmc/DmcSessionResult";
import { CommentRequest } from "./Video/CommentRequest";
export declare namespace Session {
    /**
     * Create Request object to login into nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {Axios.AxiosRequestConfig}
     */
    function createLoginRequest(email: string, password: string): Axios.AxiosRequestConfig;
    /**
     * Create Request object to logout from nicovideo.jp.
     * @returns {Axios.AxiosRequestConfig}
     * @todo check is collect.
     */
    function createLogoutRequest(): Axios.AxiosRequestConfig;
    function createCheckActiveRequest(): Axios.AxiosRequestConfig;
}
export declare namespace Video {
    /**
     * Create Reqeust object to access getthumbinfo API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    function createGetThumbInfoRequest(videoId: string): Axios.AxiosRequestConfig;
    /**
     * Create Request object to access watch API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    function createWatchRequest(videoId: string): Axios.AxiosRequestConfig;
    /**
     * Create Request object to access getflv API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    function createGetFlvRequest(videoId: string): Axios.AxiosRequestConfig;
    /**
     * Create Request object to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Axios.AxiosRequestConfig}
     */
    function createDownloadFromSmileRequest(videoId: string, videoUrl: string): Axios.AxiosRequestConfig;
    /**
     * Create Request object to start session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} session
     * @returns {Axios.AxiosRequestConfig}
     */
    function createDmcSessionRequest(videoId: string, apiUrl: string, session: DmcSession): Axios.AxiosRequestConfig;
    /**
     * Create Request object to keep session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} dmcSession
     * @returns {Axios.AxiosRequestConfig}
     */
    function createDmcHeartbeatRequest(videoId: string, apiUrl: string, dmcSession: DmcSessionResult): Axios.AxiosRequestConfig;
    /**
     * Create Request object to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Axios.AxiosRequestConfig}
     */
    function createDownloadFromDmcRequest(videoId: string, videoUrl: string): Axios.AxiosRequestConfig;
    const createGetCommentRequest: (request: CommentRequest) => Axios.AxiosRequestConfig;
    function createGetCommentByJsonRequest(request: CommentRequest): Axios.AxiosRequestConfig;
    function createGetCommentByXMLRequest(body: string): Axios.AxiosRequestConfig;
    function createGetThreadKeyRequest(threadId: number): Axios.AxiosRequestConfig;
    function createGetWaybackKeyRequest(threadId: number): Axios.AxiosRequestConfig;
}
export declare namespace Ranking {
    function createGetRankingRSSRequest(period: string, type: string, suffix: string): {
        method: string;
        url: string;
        params: {
            rss: string;
            lang: string;
        };
    };
}
