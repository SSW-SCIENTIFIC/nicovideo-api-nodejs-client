import * as Request from "request";
import * as RequestPromise from "request-promise";

import * as Axios from "axios";

import * as APIUrl from "./APIUrls";
import { DmcSession } from "./Video/Dmc/DmcSession";
import { DmcSessionResult } from "./Video/Dmc/DmcSessionResult";
import { CommentRequest } from "./Video/CommentRequest";

export namespace Session {
    /**
     * Create Request object to login into nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {Axios.AxiosRequestConfig}
     */
    export function createLoginRequest(email: string, password: string): Axios.AxiosRequestConfig {
        return {
            method: "POST",
            url: APIUrl.LOGIN,
            data: {
                mail_tel: email,
                password: password,
            },
            withCredentials: true,
        };
    }

    /**
     * Create Request object to logout from nicovideo.jp.
     * @returns {Axios.AxiosRequestConfig}
     * @todo check is collect.
     */
    export function createLogoutRequest(): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: APIUrl.LOGOUT,
            withCredentials: true,
        };
    }

    export function createCheckActiveRequest(): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: APIUrl.MYLIST_DEFAULT,
            withCredentials: true,
        };
    }
}

export namespace Video {
    /**
     * Create Reqeust object to access getthumbinfo API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    export function createGetThumbInfoRequest(videoId: string): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: APIUrl.GET_THUMB_INFO + videoId,
        };
    }

    /**
     * Create Request object to access watch API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    export function createWatchRequest(videoId: string): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: APIUrl.WATCH + videoId,
            withCredentials: true,
        };
    }

    /**
     * Create Request object to access getflv API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    export function createGetFlvRequest(videoId: string): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: APIUrl.GET_FLV + videoId + (videoId.match(/^nm/) ? "?as3=1" : ""),
            params: {
                as3: videoId.match(/^nm/) ? 1 : undefined,
            },
        };
    }

    /**
     * Create Request object to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Axios.AxiosRequestConfig}
     */
    export function createDownloadFromSmileRequest(videoId: string, videoUrl: string): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: videoUrl,
            headers: {
                "Referer": APIUrl.WATCH + videoId,
            },
        };
    }

    /**
     * Create Request object to start session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} session
     * @returns {Axios.AxiosRequestConfig}
     */
    export function createDmcSessionRequest(videoId: string, apiUrl: string, session: DmcSession): Axios.AxiosRequestConfig {
        return {
            url: apiUrl,
            method: "POST",
            data: JSON.stringify({session: session}),
            params: {
                _format: "json",
            },
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
            responseType: "json",
        };
    }

    /**
     * Create Request object to keep session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} dmcSession
     * @returns {Axios.AxiosRequestConfig}
     */
    export function createDmcHeartbeatRequest(videoId: string, apiUrl: string, dmcSession: DmcSessionResult): Axios.AxiosRequestConfig {
        return {
            url: apiUrl + "/" + dmcSession.id,
            method: "PUT",
            data: JSON.stringify({ session: dmcSession }),
            params: {
                _format: "json",
            },
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
            responseType: "json",
        };
    }

    /**
     * Create Request object to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Axios.AxiosRequestConfig}
     */
    export function createDownloadFromDmcRequest(videoId: string, videoUrl: string): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: videoUrl,
            headers: {
                "Origin": APIUrl.ORIGIN,
                "Range": "bytes=0-",
                "Referer": APIUrl.WATCH + videoId,
            },
        };
    }

    export const createGetCommentRequest: (request: CommentRequest) => Axios.AxiosRequestConfig = createGetCommentByJsonRequest;

    export function createGetCommentByJsonRequest(request: CommentRequest): Axios.AxiosRequestConfig {
        return {
            method: "POST",
            url: APIUrl.COMMENT_JSON,
            data: JSON.stringify(request),
        };
    }

    export function createGetCommentByXMLRequest(body: string): Axios.AxiosRequestConfig {
        return {
            method: "POST",
            url: APIUrl.COMMENT_XML,
            data: body,
        };
    }

    export function createGetThreadKeyRequest(threadId: number): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: APIUrl.GET_THREAD_KEY,
            params: {
                thread: threadId,
            },
        };
    }

    export function createGetWaybackKeyRequest(threadId: number): Axios.AxiosRequestConfig {
        return {
            method: "GET",
            url: APIUrl.GET_WAYBACK_KEY,
            params: {
                thread: threadId,
            },
        };
    }
}
