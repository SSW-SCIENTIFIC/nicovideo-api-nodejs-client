"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIUrl = require("./APIUrls");
const ORIGIN = "http://www.nicovideo.jp";
var Session;
(function (Session) {
    /**
     * Returns request-promise options to login to nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {RequestPromise.Options}
     */
    function login(email, password) {
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
    Session.login = login;
    /**
     * Returns request-promise options to logout from nicovideo.jp.
     * @returns {RequestPromise.Options}
     * @todo check is collect.
     */
    function logout() {
        return {
            method: "GET",
            uri: APIUrl.LOGOUT,
        };
    }
    Session.logout = logout;
})(Session = exports.Session || (exports.Session = {}));
var Video;
(function (Video) {
    /**
     * Returns request-promise options to access to getthumbinfo API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function getthumbinfo(videoId) {
        return {
            method: "GET",
            uri: APIUrl.GET_THUMB_INFO + videoId,
        };
    }
    Video.getthumbinfo = getthumbinfo;
    /**
     * Returns request-promise options to access to watch API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function watch(videoId) {
        return {
            method: "GET",
            uri: APIUrl.WATCH + videoId,
        };
    }
    Video.watch = watch;
    /**
     * Returns request-promise options to access to getflv API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function getflv(videoId) {
        return {
            method: "GET",
            uri: APIUrl.GET_FLV + videoId + (videoId.match(/^nm/) ? "?as3=1" : ""),
        };
    }
    Video.getflv = getflv;
    /**
     * Returns request options to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUri
     * @returns {Request.Options}
     */
    function downloadsmile(videoId, videoUri) {
        return {
            method: "GET",
            uri: videoUri,
            encoding: null,
            headers: {
                "Referer": APIUrl.WATCH + videoId,
            },
        };
    }
    Video.downloadsmile = downloadsmile;
    /**
     * Returns request-promise options to start session for dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {object} body
     * @returns {RequestPromise.Options}
     */
    function dmcsession(videoId, apiUrl, body) {
        return {
            uri: apiUrl + "/?_format=json",
            method: "POST",
            body: body,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }
    Video.dmcsession = dmcsession;
    /**
     * Returns request-promise options to keep session for dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {string} dmcSessionId
     * @param {string} body
     * @returns {RequestPromise.Options}
     */
    function dmcheartbeat(videoId, apiUrl, dmcSessionId, body) {
        return {
            uri: apiUrl + "/" + dmcSessionId + "?_format=json",
            method: "PUT",
            body: JSON.stringify(dmcSessionId),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }
    Video.dmcheartbeat = dmcheartbeat;
    /**
     * Returns request options to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    function downloaddmc(videoId, videoUrl) {
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
    Video.downloaddmc = downloaddmc;
    Video.getcomment = getcommentjson;
    function getcommentjson(body) {
        return {
            method: "POST",
            uri: APIUrl.COMMENT_JSON,
            body: body,
        };
    }
    Video.getcommentjson = getcommentjson;
    function getcommentxml(body) {
        return {
            method: "POST",
            uri: APIUrl.COMMENT_XML,
            body: body,
        };
    }
    Video.getcommentxml = getcommentxml;
    function getthreadkey(threadId) {
        return {
            method: "GET",
            uri: "http://flapi.nicovideo.jp/api/getthreadkey?thread=" + threadId,
        };
    }
    Video.getthreadkey = getthreadkey;
})(Video = exports.Video || (exports.Video = {}));
//# sourceMappingURL=APIEntryPoints.js.map