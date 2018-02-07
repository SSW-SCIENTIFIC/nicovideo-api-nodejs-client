"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const APIEntryPoints_1 = require("../APIEntryPoints");
/**
 * Access nicovideo.jp Level API Directly.
 */
class Live {
    /**
     * @constructor
     * @param {Session} session
     */
    constructor(session) {
        this.session = session;
        // do nothing
    }
    /**
     * Access live-watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    async getLiveWatchPage(videoId, isHTML5 = true) {
        const options = APIEntryPoints_1.Live.createLiveWatchRequest(videoId);
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
}
exports.Live = Live;
//# sourceMappingURL=LowLevel.js.map