/// <reference types="request-promise" />
/// <reference types="request" />
import * as Request from "request";
import * as RequestPromise from "request-promise";
export declare namespace Session {
    /**
     * Returns request-promise options to login to nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {RequestPromise.Options}
     */
    function login(email: string, password: string): RequestPromise.Options;
    /**
     * Returns request-promise options to logout from nicovideo.jp.
     * @returns {RequestPromise.Options}
     * @todo check is collect.
     */
    function logout(): RequestPromise.Options;
}
export declare namespace Video {
    /**
     * Returns request-promise options to access to getthumbinfo API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function getthumbinfo(videoId: string): RequestPromise.Options;
    /**
     * Returns request-promise options to access to watch API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function watch(videoId: string): RequestPromise.Options;
    /**
     * Returns request-promise options to access to getflv API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function getflv(videoId: string): RequestPromise.Options;
    /**
     * Returns request options to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUri
     * @returns {Request.Options}
     */
    function downloadsmile(videoId: string, videoUri: string): Request.Options;
    /**
     * Returns request-promise options to start session for dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {object} body
     * @returns {RequestPromise.Options}
     */
    function dmcsession(videoId: string, apiUrl: string, body: string): RequestPromise.Options;
    /**
     * Returns request-promise options to keep session for dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {string} dmcSessionId
     * @param {string} body
     * @returns {RequestPromise.Options}
     */
    function dmcheartbeat(videoId: string, apiUrl: string, dmcSessionId: string, body: string): RequestPromise.Options;
    /**
     * Returns request options to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    function downloaddmc(videoId: string, videoUrl: string): Request.Options;
    const getcomment: (body: string) => Request.Options;
    function getcommentjson(body: string): Request.Options;
    function getcommentxml(body: string): Request.Options;
    function getthreadkey(threadId: string): Request.Options;
}
