"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIUrl = require("./APIUrls");
var Session;
(function (Session) {
    /**
     * Create Request object to login into nicovideo.jp.
     * @param {string} email An E-mail used to login.
     * @param {string} password A password used to login.
     * @returns {Axios.AxiosRequestConfig}
     */
    function createLoginRequest(email, password) {
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
    Session.createLoginRequest = createLoginRequest;
    /**
     * Create Request object to logout from nicovideo.jp.
     * @returns {Axios.AxiosRequestConfig}
     * @todo check is collect.
     */
    function createLogoutRequest() {
        return {
            method: "GET",
            url: APIUrl.LOGOUT,
            withCredentials: true,
        };
    }
    Session.createLogoutRequest = createLogoutRequest;
    function createCheckActiveRequest() {
        return {
            method: "GET",
            url: APIUrl.MYLIST_DEFAULT,
            withCredentials: true,
        };
    }
    Session.createCheckActiveRequest = createCheckActiveRequest;
})(Session = exports.Session || (exports.Session = {}));
var Video;
(function (Video) {
    /**
     * Create Reqeust object to access getthumbinfo API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    function createGetThumbInfoRequest(videoId) {
        return {
            method: "GET",
            url: APIUrl.GET_THUMB_INFO + videoId,
        };
    }
    Video.createGetThumbInfoRequest = createGetThumbInfoRequest;
    /**
     * Create Request object to access watch API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    function createWatchRequest(videoId) {
        return {
            method: "GET",
            url: APIUrl.WATCH + videoId,
            withCredentials: true,
        };
    }
    Video.createWatchRequest = createWatchRequest;
    /**
     * Create Request object to access getflv API.
     * @param {string} videoId
     * @returns {Axios.AxiosRequestConfig}
     */
    function createGetFlvRequest(videoId) {
        return {
            method: "GET",
            url: APIUrl.GET_FLV + videoId + (videoId.match(/^nm/) ? "?as3=1" : ""),
            params: {
                as3: videoId.match(/^nm/) ? 1 : undefined,
            },
        };
    }
    Video.createGetFlvRequest = createGetFlvRequest;
    /**
     * Create Request object to download video from smile server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Axios.AxiosRequestConfig}
     */
    function createDownloadFromSmileRequest(videoId, videoUrl) {
        return {
            method: "GET",
            url: videoUrl,
            headers: {
                "Referer": APIUrl.WATCH + videoId,
            },
            withCredentials: true,
            responseType: "arraybuffer",
        };
    }
    Video.createDownloadFromSmileRequest = createDownloadFromSmileRequest;
    /**
     * Create Request object to start session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} session
     * @returns {Axios.AxiosRequestConfig}
     */
    function createDmcSessionRequest(videoId, apiUrl, session) {
        return {
            url: apiUrl,
            method: "POST",
            data: JSON.stringify({ session: session }),
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
    Video.createDmcSessionRequest = createDmcSessionRequest;
    /**
     * Create Request object to keep session on dmc server.
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} dmcSession
     * @returns {Axios.AxiosRequestConfig}
     */
    function createDmcHeartbeatRequest(videoId, apiUrl, dmcSession) {
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
    Video.createDmcHeartbeatRequest = createDmcHeartbeatRequest;
    /**
     * Create Request object to download video from dmc server.
     * @param {string} videoId
     * @param {string} videoUrl
     * @returns {Axios.AxiosRequestConfig}
     */
    function createDownloadFromDmcRequest(videoId, videoUrl) {
        return {
            method: "GET",
            url: videoUrl,
            headers: {
                "Origin": APIUrl.ORIGIN,
                "Range": "bytes=0-",
                "Referer": APIUrl.WATCH + videoId,
            },
            responseType: "arraybuffer",
        };
    }
    Video.createDownloadFromDmcRequest = createDownloadFromDmcRequest;
    Video.createGetCommentRequest = createGetCommentByJsonRequest;
    function createGetCommentByJsonRequest(request) {
        return {
            method: "POST",
            url: APIUrl.COMMENT_JSON,
            data: JSON.stringify(request),
        };
    }
    Video.createGetCommentByJsonRequest = createGetCommentByJsonRequest;
    function createGetCommentByXMLRequest(body) {
        return {
            method: "POST",
            url: APIUrl.COMMENT_XML,
            data: body,
        };
    }
    Video.createGetCommentByXMLRequest = createGetCommentByXMLRequest;
    function createGetThreadKeyRequest(threadId) {
        return {
            method: "GET",
            url: APIUrl.GET_THREAD_KEY,
            params: {
                thread: threadId,
            },
        };
    }
    Video.createGetThreadKeyRequest = createGetThreadKeyRequest;
    function createGetWaybackKeyRequest(threadId) {
        return {
            method: "GET",
            url: APIUrl.GET_WAYBACK_KEY,
            params: {
                thread: threadId,
            },
        };
    }
    Video.createGetWaybackKeyRequest = createGetWaybackKeyRequest;
})(Video = exports.Video || (exports.Video = {}));
var Ranking;
(function (Ranking) {
    function createGetRankingRSSRequest(period, type, suffix) {
        return {
            method: "GET",
            url: APIUrl.RANKING_RSS + period + "/" + type + "/" + suffix,
            params: {
                rss: "2.0",
                lang: "ja-JP",
            },
        };
    }
    Ranking.createGetRankingRSSRequest = createGetRankingRSSRequest;
})(Ranking = exports.Ranking || (exports.Ranking = {}));
//# sourceMappingURL=APIEntryPoints.js.map