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
    async getVideoFromSmile(param) {
        let videoInfo;
        if (typeof param == "string") {
            videoInfo = (await this.getWatchData(param)).video;
        }
        else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }
        return await this.requestPromise(APIEntryPoints_1.Video.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url));
    }
    async getVideoStreamFromSmile(param) {
        let videoInfo;
        if (typeof param === "string") {
            videoInfo = (await this.getWatchData(param)).video;
        }
        else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }
        return this.request(APIEntryPoints_1.Video.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url));
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
        return await this.lowLevel.createDmcSession(watchAPIData.video.id, watchAPIData.video.dmcInfo.session_api.urls[0].url, DmcSessionUtility_1.DmcSessionUtility.createSessionFromWatchAPIData(watchAPIData));
    }
    async getVideoFromDmc(param) {
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
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
        }, session.keep_method.heartbeat.lifetime * 0.9);
        return this.requestPromise(APIEntryPoints_1.Video.createDownloadFromDmcRequest(id, session.content_uri))
            .finally(() => clearInterval(intervalId));
    }
    async getVideoStreamFromDmc(param) {
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
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
        }, session.keep_method.heartbeat.lifetime * 0.9);
        return this.request(APIEntryPoints_1.Video.createDownloadFromDmcRequest(watchAPIData.video.id, session.content_uri), () => clearInterval(intervalId));
    }
    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    async getVideo(videoId) {
        const request = (await this.getVideoStreamFromDmc(videoId));
        request.on("response", (response) => {
            request.abort();
        });
    }
    async getVideoStream() {
    }
    async getComment(watchData) {
        if (watchData.video.isOfficial) {
            const keys = await this.getThreadKey(watchData);
        }
        else {
        }
    }
    async getThreadKey(param) {
        let threadId;
        if (typeof param === "number") {
            threadId = param;
        }
        else {
            threadId = param.thread.ids.nicos || param.thread.ids.community || param.thread.ids.default;
        }
        return this.lowLevel.getThreadKey(threadId);
    }
}
exports.Video = Video;
//# sourceMappingURL=Video.js.map