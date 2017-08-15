"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryString = require("querystring");
const xml_js_1 = require("xml-js");
const cheerio = require("cheerio");
const APIEntryPoints_1 = require("../APIEntryPoints");
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
        // do nothing
    }
    /**
     * Access getthhumbinfo API and get parsed object.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    async getThumbInfo(videoId) {
        return xml_js_1.xml2js((await this.session.client.request(APIEntryPoints_1.Video.createGetThumbInfoRequest(videoId))).data, { compact: true });
    }
    /**
     * Access getflv API and get parsed object.
     * @param videoId
     * @returns {Promise<string>}
     */
    async getFlv(videoId) {
        return QueryString.parse((await this.session.client.request(APIEntryPoints_1.Video.createGetFlvRequest(videoId))).data);
    }
    /**
     * Access watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    async getWatchPage(videoId, isHTML5 = true) {
        const options = APIEntryPoints_1.Video.createWatchRequest(videoId);
        options.headers = options.headers || {};
        const cookies = ([options.headers.Cookie] || []);
        cookies.push("watch_html5=" + (isHTML5 ? 1 : 0), "watch_flash=" + (isHTML5 ? 0 : 1));
        options.headers.Cookie = cookies.join("; ");
        return (await this.session.client.request(options)).data;
    }
    /**
     * Get watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    async getWatchData(videoId, isHTML5 = true) {
        let dom = cheerio.load(await this.getWatchPage(videoId, isHTML5));
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
        return (await this.session.client.request(APIEntryPoints_1.Video.createDmcSessionRequest(videoId, apiUrl, session))).data.data.session;
    }
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} session
     * @returns {Promise<DmcSessionResult>}
     */
    async sendDmcHeartbeat(videoId, apiUrl, session) {
        return (await this.session.client.request(APIEntryPoints_1.Video.createDmcHeartbeatRequest(videoId, apiUrl, session))).data.data.session;
    }
    async getThreadKey(threadId) {
        const result = QueryString.parse((await this.session.client.request(APIEntryPoints_1.Video.createGetThreadKeyRequest(threadId))).data);
        return { key: result.threadkey, force_184: result.force_184 == 1 };
    }
    async getCommentByJson(request) {
        return (await this.session.client.request(APIEntryPoints_1.Video.createGetCommentByJsonRequest(request))).data;
    }
    async getCommentByXML(body) {
        return (await this.session.client.request(APIEntryPoints_1.Video.createGetCommentByXMLRequest(body))).data;
    }
    async getWaybackKey(threadId) {
        return QueryString.parse((await this.session.client.request(APIEntryPoints_1.Video.createGetWaybackKeyRequest(threadId))).data).waybackkey;
    }
}
exports.Video = Video;
//# sourceMappingURL=LowLevel.js.map