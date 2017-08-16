"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DmcSessionUtility_1 = require("./Utility/DmcSessionUtility");
const VideoLow = require("./LowLevel");
const APIEntryPoints_1 = require("../APIEntryPoints");
const Exception_1 = require("../Exception");
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
    async getVideoFromSmile(param, progressHandler = () => { }) {
        let videoInfo;
        if (typeof param == "string") {
            videoInfo = (await this.getWatchData(param)).video;
        }
        else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }
        const options = APIEntryPoints_1.Video.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url);
        options.onDownloadProgress = progressHandler;
        return (await this.session.client.request(options)).data;
    }
    async getVideoStreamFromSmile(param, progressHandler = () => { }) {
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
        options.onDownloadProgress = progressHandler;
        return (await this.session.client.request(options)).data;
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
    async getVideoFromDmc(param, progressHandler = () => { }) {
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
        const options = APIEntryPoints_1.Video.createDownloadFromDmcRequest(id, session.content_uri);
        options.onDownloadProgress = progressHandler;
        const intervalId = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
        }, session.keep_method.heartbeat.lifetime * 0.9);
        const fin = (arg) => {
            clearInterval(intervalId);
            return arg;
        };
        return (await this.session.client.request(options).then(fin).catch(fin)).data;
    }
    async getVideoStreamFromDmc(param, progressHandler = () => { }) {
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
        const options = APIEntryPoints_1.Video.createDownloadFromDmcRequest(watchAPIData.video.id, session.content_uri);
        options.responseType = "stream";
        options.onDownloadProgress = progressHandler;
        const intervalId = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
        }, session.keep_method.heartbeat.lifetime * 0.9);
        return (await this.session.client.request(options)).data.on("close", () => clearInterval(intervalId));
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