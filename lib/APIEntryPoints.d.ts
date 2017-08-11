/// <reference types="request-promise" />
/// <reference types="request" />
import * as Request from "request";
import * as RequestPromise from "request-promise";
import { DmcSession } from "./Video/Dmc/DmcSession";
import { DmcSessionResult } from "./Video/Dmc/DmcSessionResult";
export declare namespace Session {
    /**
     * Create Request object to login into nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {RequestPromise.Options}
     */
    function createLoginRequest(email: string, password: string): RequestPromise.Options;
    /**
     * Create Request object to logout from nicovideo.jp.
     * @returns {RequestPromise.Options}
     * @todo check is collect.
     */
    function createLogoutRequest(): RequestPromise.Options;
}
export declare namespace Video {
    /**
     * Create Reqeust object to access getthumbinfo API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function createGetThumbInfoRequest(videoId: string): RequestPromise.Options;
    /**
     * Create Request object to access watch API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function createWatchRequest(videoId: string): RequestPromise.Options;
    /**
     * Create Request object to access getflv API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function createGetFlvRequest(videoId: string): RequestPromise.Options;
    /**
     * Create Request object to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    function createDownloadFromSmileRequest(videoId: string, videoUrl: string): Request.Options;
    /**
     * Create Request object to start session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} session
     * @returns {RequestPromise.Options}
     */
    function createDmcSessionRequest(videoId: string, apiUrl: string, session: DmcSession): RequestPromise.Options;
    /**
     * Create Request object to keep session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} dmcSession
     * @returns {RequestPromise.Options}
     */
    function createDmcHeartbeatRequest(videoId: string, apiUrl: string, dmcSession: DmcSessionResult): RequestPromise.Options;
    /**
     * Create Request object to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    function createDownloadFromDmcRequest(videoId: string, videoUrl: string): Request.Options;
    const createGetCommentRequest: (body: string) => Request.Options;
    function createGetCommentByJsonRequest(body: string): Request.Options;
    function createGetCommentByXMLRequest(body: string): Request.Options;
    function createGetThreadKeyRequest(threadId: string): Request.Options;
}
