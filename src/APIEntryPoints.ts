import * as Request from "request";
import * as RequestPromise from "request-promise";

import * as APIUrl from "./APIUrls";
import { DmcSession } from "./Video/DmcSession";

const ORIGIN = "http://www.nicovideo.jp";

export namespace Session {
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
}

export namespace Video {
    export function getthumbinfo(movieId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.GET_THUMB_INFO + movieId,
        };
    }

    export function watch(movieId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.WATCH + movieId,
        };
    }

    export function getflv(movieId: string): RequestPromise.Options {
        return {
            method: "GET",
            uri: APIUrl.GET_FLV + movieId + (movieId.match(/^nm/) ? "?as3=1" : ""),
        };
    }

    export function downloadflv(movieId: string, flvUri: string): Request.Options {
        return {
            method: "GET",
            uri: flvUri,
            encoding: null,
            headers: {
                "Referer": APIUrl.WATCH + movieId,
            }
        };
    }

    export function dmcsession(movieId: string, apiUrl: string, dmcSession: DmcSession): RequestPromise.Options {
        return {
            uri: apiUrl + "/?_format=json",
            method: "POST",
            body: JSON.stringify(dmcSession),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + movieId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }

    export function dmcheartbeat(movieId: string, apiUrl: string, dmcSession: DmcSession): RequestPromise.Options {
        return {
            uri: apiUrl + "/" + dmcSession.session.id + "?_format=json&_method=PUT",
            method: "POST",
            body: JSON.stringify(dmcSession),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + movieId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }

    export function downloaddmc(movieId: string, dmcUrl: string): Request.Options {
        return {
            method: "GET",
            uri: dmcUrl,
            encoding: null,
            headers: {
                "Origin": "http://www.nicovideo.jp",
                "Range": "bytes=0-",
                "Referer": "http://www.nicovideo.jp/watch/" + movieId,
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
