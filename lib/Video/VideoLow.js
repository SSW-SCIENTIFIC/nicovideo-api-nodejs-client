"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const Request = require("request");
const RequestPromise = require("request-promise");
const APIEntryPoints_1 = require("../APIEntryPoints");
const APIUrl = require("../APIUrls");
/**
 * Access nicovideo.jp APIs and Returns response directly.
 */
class Video {
    /**
     * @constructor
     * @param {Session} session
     */
    constructor(session) {
        this.session = session;
        this.request = Request.defaults({ jar: session.jar });
        this.requestPromise = RequestPromise.defaults({ jar: session.jar });
    }
    /**
     * Access to getthhumbinfo API and returns response body.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    async getThumbInfo(videoId) {
        return await this.requestPromise(APIEntryPoints_1.Video.getthumbinfo(videoId));
    }
    /**
     * Access to watch API and returns response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    async watch(videoId, isHTML5 = true) {
        this.session.jar.setCookie(this.request.cookie("watch_html5=" + (isHTML5 ? "1" : "0")), APIUrl.WATCH + videoId);
        return await this.requestPromise(APIEntryPoints_1.Video.watch(videoId));
    }
    /**
     * Access to getflv API and returns response body.
     * @param videoId
     * @returns {Promise<string>}
     */
    async getFLV(videoId) {
        return await this.requestPromise(APIEntryPoints_1.Video.getflv(videoId));
    }
    /**
     * Returns watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    async watchAPIData(videoId, isHTML5 = true) {
        let dom = cheerio.load(await this.watch(videoId, isHTML5).catch((err) => ""));
        return isHTML5 ?
            JSON.parse(dom("#js-initial-watch-data").attr("data-api-data") || "{}") :
            JSON.parse(dom("#watchAPIDataContainer").text() || "{}");
    }
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {object} body
     * @returns {Promise<string>}
     */
    async dmcSession(videoId, apiUrl, body) {
        return await this.requestPromise(APIEntryPoints_1.Video.dmcsession(videoId, apiUrl, body));
    }
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} dmcSession
     * @returns {Promise<string>}
     */
    async dmcHeartbeat(videoId, apiUrl, dmcSession) {
        return await this.requestPromise(APIEntryPoints_1.Video.dmcheartbeat(videoId, apiUrl, { session: dmcSession }));
    }
    async getThreadKey(threadId) {
        return await this.requestPromise(APIEntryPoints_1.Video.getthreadkey(threadId));
    }
    async getComment(body) {
        return await this.requestPromise(APIEntryPoints_1.Video.getcomment(body));
    }
    async getCommentJSON(body) {
        return await this.requestPromise(APIEntryPoints_1.Video.getcommentjson(body));
    }
}
exports.Video = Video;
//# sourceMappingURL=VideoLow.js.map