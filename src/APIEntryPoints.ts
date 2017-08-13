import * as Request from "request";
import * as RequestPromise from "request-promise";

import * as APIUrl from "./APIUrls";
import { DmcSession } from "./Video/Dmc/DmcSession";
import {DmcSessionResult} from "./Video/Dmc/DmcSessionResult";

export namespace Session {
    /**
     * Create Request object to login into nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {RequestPromise.Options}
     */
    export function createLoginRequest(email: string, password: string): RequestPromise.Options {
        return {
            method: "POST",
            uri: APIUrl.LOGIN,
            form: {
                mail_tel: email,
                password: password,
            },
            simple: false,
        };
    }

    /**
     * Create Request object to logout from nicovideo.jp.
     * @returns {RequestPromise.Options}
     * @todo check is collect.
     */
    export function createLogoutRequest(): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.LOGOUT,
        };
    }
}

export namespace Video {
    /**
     * Create Reqeust object to access getthumbinfo API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    export function createGetThumbInfoRequest(videoId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.GET_THUMB_INFO + videoId,
        };
    }

    /**
     * Create Request object to access watch API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    export function createWatchRequest(videoId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.WATCH + videoId,
        };
    }

    /**
     * Create Request object to access getflv API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    export function createGetFlvRequest(videoId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.GET_FLV + videoId + (videoId.match(/^nm/) ? "?as3=1" : ""),
        };
    }

    /**
     * Create Request object to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    export function createDownloadFromSmileRequest(videoId: string, videoUrl: string): Request.Options {
        return {
            method: "GET",
            uri: videoUrl,
            encoding: null,
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
     * @returns {RequestPromise.Options}
     */
    export function createDmcSessionRequest(videoId: string, apiUrl: string, session: DmcSession): RequestPromise.Options {
        return {
            uri: apiUrl + "/?_format=json",
            method: "POST",
            body: JSON.stringify({session: session}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }

    /**
     * Create Request object to keep session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} dmcSession
     * @returns {RequestPromise.Options}
     */
    export function createDmcHeartbeatRequest(videoId: string, apiUrl: string, dmcSession: DmcSessionResult): RequestPromise.Options {
        return {
            uri: apiUrl + "/" + dmcSession.id + "?_format=json",
            method: "PUT",
            body: JSON.stringify({ session: dmcSession }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }

    /**
     * Create Request object to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    export function createDownloadFromDmcRequest(videoId: string, videoUrl: string): Request.Options {
        return {
            method: "GET",
            uri: videoUrl,
            encoding: null,
            headers: {
                "Origin": APIUrl.ORIGIN,
                "Range": "bytes=0-",
                "Referer": APIUrl.WATCH + videoId,
            },
        };
    }

    export const createGetCommentRequest: (body: string) => Request.Options = createGetCommentByJsonRequest;

    export function createGetCommentByJsonRequest(body: string): Request.Options {
        return {
            method: "POST",
            uri: APIUrl.COMMENT_JSON,
            body: body,
        };
    }

    export function createGetCommentByXMLRequest(body: string): Request.Options {
        return {
            method: "POST",
            uri: APIUrl.COMMENT_XML,
            body: body,
        };
    }

    export function createGetThreadKeyRequest(threadId: number): Request.Options {
        return {
            method: "GET",
            uri: APIUrl.GET_THREAD_KEY + "?thread=" + threadId,
        };
    }

    export function createGetWaybackKeyRequest(threadId: number): Request.Options {
        return {
            method: "GET",
            uri: "http://flapi.nicovideo.jp/api/getwaybackkey?thread=" + threadId,
        };
    }
}
