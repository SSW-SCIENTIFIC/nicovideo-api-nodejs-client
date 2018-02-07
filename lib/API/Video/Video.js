"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("../../Model/Common");
const DmcSessionUtility_1 = require("../../Model/Video/Utility/DmcSessionUtility");
const VideoLow = require("./LowLevel");
const APIEntryPoints_1 = require("../APIEntryPoints");
__export(require("../../Model/Common/index"));
class Video {
    /**
     * @constructor
     * @param {Session} session
     */
    constructor(session) {
        this.session = session;
        this.lowLevel = new VideoLow.Video(session);
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
        const options = APIEntryPoints_1.Video.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url);
        return await this.session.client.request(options);
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
        const options = APIEntryPoints_1.Video.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url);
        options.responseType = "stream";
        return await this.session.client.request(options);
    }
    /**
     * Create Session for DMC Server.
     * @param {WatchData} watchAPIData
     * @returns {Promise<DmcSessionResult>}
     */
    async createDmcSession(watchAPIData) {
        if (!watchAPIData.video.dmcInfo) {
            throw new Common_1.Exception();
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
            throw new Common_1.Exception();
        }
        const session = await this.createDmcSession(watchAPIData);
        const id = watchAPIData.video.id;
        const apiUrl = watchAPIData.video.dmcInfo.session_api.urls[0].url;
        const options = APIEntryPoints_1.Video.createDownloadFromDmcRequest(id, session.content_uri);
        const intervalId = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
        }, session.keep_method.heartbeat.lifetime * 0.9);
        const fin = (arg) => {
            clearInterval(intervalId);
            return arg;
        };
        return await this.session.client.request(options).then(fin).catch(fin);
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
            throw new Common_1.Exception();
        }
        const session = await this.createDmcSession(watchAPIData);
        const id = watchAPIData.video.id;
        const apiUrl = watchAPIData.video.dmcInfo.session_api.urls[0].url;
        const options = APIEntryPoints_1.Video.createDownloadFromDmcRequest(watchAPIData.video.id, session.content_uri);
        options.responseType = "stream";
        const intervalId = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
        }, session.keep_method.heartbeat.lifetime * 0.9);
        const result = await this.session.client.request(options);
        result.data
            .on("close", () => clearInterval(intervalId))
            .on("end", () => clearInterval(intervalId))
            .on("error", () => clearInterval(intervalId));
        return result;
    }
    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    async getVideo(videoId) {
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