"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request");
const RequestPromise = require("request-promise");
const DmcSessionUtility_1 = require("./Utility/DmcSessionUtility");
const VideoLow = require("./LowLevel");
const APIEntryPoints_1 = require("../APIEntryPoints");
const Exception_1 = require("../Exception");
class Video {
    /**
     * Video API Client constructor.
     * @param {Session} session
     */
    constructor(session) {
        this.session = session;
        this.request = Request.defaults({ jar: this.session.jar });
        this.requestPromise = RequestPromise.defaults({ jar: this.session.jar });
        this.lowLevel = new VideoLow.Video(this.session);
    }
    /**
     * Get WatchData from watch API.
     * @param {string} videoId
     * @returns {Promise<WatchData>}
     */
    async getWatchData(videoId) {
        return await this.lowLevel.getWatchData(videoId);
    }
    async downloadFromSmile(param) {
        let videoInfo;
        if (typeof param == "string") {
            videoInfo = (await this.getWatchData(param)).video;
        }
        else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }
        return await this.requestPromise(APIEntryPoints_1.Video.downloadsmile(videoInfo.id, videoInfo.smileInfo.url));
    }
    async streamFromSmile(param) {
        let videoInfo;
        if (typeof param === "string") {
            videoInfo = (await this.getWatchData(param)).video;
        }
        else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }
        return this.request(APIEntryPoints_1.Video.downloadsmile(videoInfo.id, videoInfo.smileInfo.url));
    }
    /**
     * Create Session for DMC Server.
     * @param {WatchData} watchAPIData
     * @returns {Promise<DmcSessionResult>}
     */
    async createDmcSession(watchAPIData) {
        if (!watchAPIData.video.dmcInfo) {
            throw new Exception_1.default();
        }
        return JSON.parse(await this.lowLevel.createDmcSession(watchAPIData.video.id, watchAPIData.video.dmcInfo.session_api.urls[0].url, JSON.stringify({ session: DmcSessionUtility_1.DmcSessionUtility.createSessionFromWatchAPIData(watchAPIData) }))).data.session;
    }
    async downloadFromDmc(param) {
        let watchAPIData;
        if (typeof param === "string") {
            watchAPIData = (await this.getWatchData(param));
        }
        else {
            watchAPIData = param;
        }
        if (!watchAPIData.video.dmcInfo) {
            throw new Exception_1.default();
        }
        const session = await this.createDmcSession(watchAPIData);
        const id = watchAPIData.video.id;
        const apiUrl = watchAPIData.video.dmcInfo.session_api.urls[0].url;
        const intervalId = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session.id, JSON.stringify({ session: session }));
        }, session.keep_method.heartbeat.lifetime * 0.9);
        return this.requestPromise(APIEntryPoints_1.Video.downloaddmc(id, session.content_uri))
            .finally(() => clearInterval(intervalId));
    }
    async streamFromDmc(param) {
        let watchAPIData;
        if (typeof param === "string") {
            watchAPIData = (await this.getWatchData(param));
        }
        else {
            watchAPIData = param;
        }
        if (!watchAPIData.video.dmcInfo) {
            throw new Exception_1.default();
        }
        const session = await this.createDmcSession(watchAPIData);
        const id = watchAPIData.video.id;
        const apiUrl = watchAPIData.video.dmcInfo.session_api.urls[0].url;
        const intervalId = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session.id, JSON.stringify({ session: session }));
        }, session.keep_method.heartbeat.lifetime * 0.9);
        return this.request(APIEntryPoints_1.Video.downloaddmc(watchAPIData.video.id, session.content_uri), () => clearInterval(intervalId));
    }
    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    async downloadVideo(videoId) {
        const request = (await this.streamFromDmc(videoId));
        request.on("response", (response) => {
            request.abort();
        });
    }
    async getComment(watchData) {
        if (watchData.video.isOfficial) {
            const keys = await this.getThreadKey(watchData.thread.ids.nicos || watchData.thread.ids.community);
        }
        else {
        }
    }
}
exports.Video = Video;
//# sourceMappingURL=Video.js.map