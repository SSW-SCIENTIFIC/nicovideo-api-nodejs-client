"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIUrl = require("./APIUrls");
var Session;
(function (Session) {
    /**
     * Create Request object to login into nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {RequestPromise.Options}
     */
    function createLoginRequest(email, password) {
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
    Session.createLoginRequest = createLoginRequest;
    /**
     * Create Request object to logout from nicovideo.jp.
     * @returns {RequestPromise.Options}
     * @todo check is collect.
     */
    function createLogoutRequest() {
        return {
            method: "GET",
            uri: APIUrl.LOGOUT,
        };
    }
    Session.createLogoutRequest = createLogoutRequest;
})(Session = exports.Session || (exports.Session = {}));
var Video;
(function (Video) {
    /**
     * Create Reqeust object to access getthumbinfo API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function createGetThumbInfoRequest(videoId) {
        return {
            method: "GET",
            uri: APIUrl.GET_THUMB_INFO + videoId,
        };
    }
    Video.createGetThumbInfoRequest = createGetThumbInfoRequest;
    /**
     * Create Request object to access watch API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function createWatchRequest(videoId) {
        return {
            method: "GET",
            uri: APIUrl.WATCH + videoId,
        };
    }
    Video.createWatchRequest = createWatchRequest;
    /**
     * Create Request object to access getflv API.
     * @param {string} videoId
     * @returns {RequestPromise.Options}
     */
    function createGetFlvRequest(videoId) {
        return {
            method: "GET",
            uri: APIUrl.GET_FLV + videoId + (videoId.match(/^nm/) ? "?as3=1" : ""),
        };
    }
    Video.createGetFlvRequest = createGetFlvRequest;
    /**
     * Create Request object to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    function createDownloadFromSmileRequest(videoId, videoUrl) {
        return {
            method: "GET",
            uri: videoUrl,
            encoding: null,
            headers: {
                "Referer": APIUrl.WATCH + videoId,
            },
        };
    }
    Video.createDownloadFromSmileRequest = createDownloadFromSmileRequest;
    /**
     * Create Request object to start session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} session
     * @returns {RequestPromise.Options}
     */
    function createDmcSessionRequest(videoId, apiUrl, session) {
        return {
            uri: apiUrl + "/?_format=json",
            method: "POST",
            body: JSON.stringify({ session: session }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Referer": APIUrl.WATCH + videoId,
                "Origin": APIUrl.ORIGIN,
            },
        };
    }
    Video.createDmcSessionRequest = createDmcSessionRequest;
    /**
     * Create Request object to keep session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} dmcSession
     * @returns {RequestPromise.Options}
     */
    function createDmcHeartbeatRequest(videoId, apiUrl, dmcSession) {
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
    Video.createDmcHeartbeatRequest = createDmcHeartbeatRequest;
    /**
     * Create Request object to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Request.Options}
     */
    function createDownloadFromDmcRequest(videoId, videoUrl) {
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
    Video.createDownloadFromDmcRequest = createDownloadFromDmcRequest;
    Video.createGetCommentRequest = createGetCommentByJsonRequest;
    function createGetCommentByJsonRequest(body) {
        return {
            method: "POST",
            uri: APIUrl.COMMENT_JSON,
            body: body,
        };
    }
    Video.createGetCommentByJsonRequest = createGetCommentByJsonRequest;
    function createGetCommentByXMLRequest(body) {
        return {
            method: "POST",
            uri: APIUrl.COMMENT_XML,
            body: body,
        };
    }
    Video.createGetCommentByXMLRequest = createGetCommentByXMLRequest;
    function createGetThreadKeyRequest(threadId) {
        return {
            method: "GET",
            uri: APIUrl.GET_THREAD_KEY + "?thread=" + threadId,
        };
    }
    Video.createGetThreadKeyRequest = createGetThreadKeyRequest;
    function createGetWaybackKeyRequest(threadId) {
        return {
            method: "GET",
            uri: "http://flapi.nicovideo.jp/api/getwaybackkey?thread=" + threadId,
        };
    }
    Video.createGetWaybackKeyRequest = createGetWaybackKeyRequest;
})(Video = exports.Video || (exports.Video = {}));
//# sourceMappingURL=APIEntryPoints.js.map