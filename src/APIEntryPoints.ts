import * as Request from "request";
import * as RequestPromise from "request-promise";

import * as APIUrl from "./APIUrls";
import { DmcSession } from "./Video/DmcSession";

const ORIGIN = "http://www.nicovideo.jp";

export namespace Session {
    /**
     * Returns request-promise options to login to nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {RequestPromise.Options}
     */
    export function login(email: string, password: string): RequestPromise.Options {
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
     * Returns request-promise options to logout from nicovideo.jp.
     * @returns {RequestPromise.Options}
     * @todo check is collect.
     */
    export function logout(): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.LOGOUT,
        };
    }
}

export namespace Video {
    /**
     * Returns request-promise options to access to getthumbinfo API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    export function getthumbinfo(videoId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.GET_THUMB_INFO + videoId,
        };
    }

    /**
     * Returns request-promise options to access to watch API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    export function watch(videoId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.WATCH + videoId,
        };
    }

    /**
     * Returns request-promise options to access to getflv API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    export function getflv(videoId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.GET_FLV + videoId + (videoId.match(/^nm/) ? "?as3=1" : ""),
        };
    }

    /**
     * Returns request options to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUri
     * @returns {Request.Options}
     */
    export function downloadsmile(videoId: string, videoUri: string): Request.Options {
        return {
            method: "GET",
            uri: videoUri,
            encoding: null,
            headers: {
                "Referer": APIUrl.WATCH + videoId,
            },
        };
    }

    /**
     * Returns request-promise options to start session for dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} dmcSession
     * @returns {RequestPromise.Options}
     */
    export function dmcsession(videoId: string, apiUrl: string, dmcSession: DmcSession): RequestPromise.Options {
        return {
            uri: apiUrl + "/?_format=json",
            method: "POST",
            body: JSON.stringify(dmcSession),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }

    /**
     * Returns request-promise options to keep session for dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} dmcSession
     * @returns {RequestPromise.Options}
     */
    export function dmcheartbeat(videoId: string, apiUrl: string, dmcSession: DmcSession): RequestPromise.Options {
        return {
            uri: apiUrl + "/" + dmcSession.session.id + "?_format=json&_method=PUT",
            method: "POST",
            body: JSON.stringify(dmcSession),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }

    /**
     * Returns request options to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    export function downloaddmc(videoId: string, videoUrl: string): Request.Options {
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
}

export namespace Comment{
    export function getcomment(messageServerUrl: string, thread: number, num: number): RequestPromise.Options {
        return {
            method: "GET",
            uri: messageServerUrl,
            useQuerystring: true,
            qs: {
                version: 20090904,
                thread: thread,
                res_from: num,
            },
        };
    }
}
