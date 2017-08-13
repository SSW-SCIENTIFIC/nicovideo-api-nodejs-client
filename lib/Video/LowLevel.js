"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryString = require("querystring");
const xml_js_1 = require("xml-js");
const cheerio = require("cheerio");
const Request = require("request");
const RequestPromise = require("request-promise");
const APIEntryPoints_1 = require("../APIEntryPoints");
const APIUrl = require("../APIUrls");
/**
 * Access nicovideo.jp Level API Directly.
 */
class Video {
    /**
     * @constructor
     * @param {Session} session
     */
    constructor(session) {
        this.session = session;
        this.getComment = this.getCommentByJson;
        this.request = Request.defaults({ jar: session.jar });
        this.requestPromise = RequestPromise.defaults({ jar: session.jar });
    }
    /**
     * Access getthhumbinfo API and get parsed object.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    async getThumbInfo(videoId) {
        return xml_js_1.xml2js(await this.requestPromise(APIEntryPoints_1.Video.createGetThumbInfoRequest(videoId)), { compact: true });
    }
    /**
     * Access getflv API and get parsed object.
     * @param videoId
     * @returns {Promise<string>}
     */
    async getFlv(videoId) {
        return QueryString.parse(await this.requestPromise(APIEntryPoints_1.Video.createGetFlvRequest(videoId)));
    }
    /**
     * Access watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    async getWatchPage(videoId, isHTML5 = true) {
        this.session.jar.setCookie(this.request.cookie("watch_html5=" + (isHTML5 ? "1" : "0")), APIUrl.WATCH + videoId);
        return await this.requestPromise(APIEntryPoints_1.Video.createWatchRequest(videoId));
    }
    /**
     * Get watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    async getWatchData(videoId, isHTML5 = true) {
        let dom = cheerio.load(await this.getWatchPage(videoId, isHTML5).catch((err) => ""));
        return isHTML5 ?
            JSON.parse(dom("#js-initial-watch-data").attr("data-api-data") || "{}") :
            JSON.parse(dom("#watchAPIDataContainer").text() || "{}");
    }
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} session
     * @returns {Promise<DmcSessionResult>}
     */
    async createDmcSession(videoId, apiUrl, session) {
        return JSON.parse(await this.requestPromise(APIEntryPoints_1.Video.createDmcSessionRequest(videoId, apiUrl, session))).data.session;
    }
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} session
     * @returns {Promise<DmcSessionResult>}
     */
    async sendDmcHeartbeat(videoId, apiUrl, session) {
        return await this.requestPromise(APIEntryPoints_1.Video.createDmcHeartbeatRequest(videoId, apiUrl, session));
    }
    async getThreadKey(threadId) {
        return QueryString.parse(await this.requestPromise(APIEntryPoints_1.Video.createGetThreadKeyRequest(threadId))).thread_key;
    }
    async getCommentByJson(body) {
        return await this.requestPromise(APIEntryPoints_1.Video.createGetCommentByJsonRequest(body));
    }
    async getCommentByXML(body) {
        return await this.requestPromise(APIEntryPoints_1.Video.createGetCommentByXMLRequest(body));
    }
    async getWaybackKey(threadId) {
        const result = QueryString.parse(await this.requestPromise(APIEntryPoints_1.Video.createGetWaybackKeyRequest(threadId))).waybackkey;
        return { key: result.thread_key, force_184: result.force_184 == 1 };
    }
}
exports.Video = Video;
//# sourceMappingURL=LowLevel.js.map