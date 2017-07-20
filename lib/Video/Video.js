"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request");
const RequestPromise = require("request-promise");
const DmcSessionUtility_1 = require("./Utility/DmcSessionUtility");
const VideoLow = require("./VideoLow");
const APIEntryPoints_1 = require("../APIEntryPoints");
const Exception_1 = require("../Exception");
const qs = require("querystring");
class Video {
    constructor(session) {
        this.session = session;
        this.request = Request.defaults({ jar: this.session.jar });
        this.requestPromise = RequestPromise.defaults({ jar: this.session.jar });
        this.lowLevel = new VideoLow.Video(this.session);
    }
    async getWatchData(videoId) {
        return (await this.lowLevel.watchAPIData(videoId));
    }
    async downloadFromSmile(param) {
        let videoInfo;
        if (typeof param === "string") {
            videoInfo = (await this.getWatchData(param)).video;
        }
        else {
            videoInfo = param;
            await this.lowLevel.watch(videoInfo.id);
        }
        return await this.requestPromise(APIEntryPoints_1.Video.downloadsmile(videoInfo.id, videoInfo.smileInfo.url));
    }
    async streamFromSmile(param) {
        let videoInfo;
        if (typeof param === "string") {
            videoInfo = (await this.getWatchData(param)).video;
        }
        else {
            videoInfo = param;
            await this.lowLevel.watch(videoInfo.id);
        }
        return this.request(APIEntryPoints_1.Video.downloadsmile(videoInfo.id, videoInfo.smileInfo.url));
    }
    async createDmcSession(watchAPIData) {
        if (!watchAPIData.video.dmcInfo) {
            throw new Exception_1.default();
        }
        return JSON.parse(await this.lowLevel.dmcSession(watchAPIData.video.id, watchAPIData.video.dmcInfo.session_api.urls[0].url, { session: DmcSessionUtility_1.DmcSessionUtility.createSessionFromWatchAPIData(watchAPIData) })).data.session;
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
            return this.lowLevel.dmcHeartbeat(id, apiUrl, session);
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
            return this.lowLevel.dmcHeartbeat(id, apiUrl, session);
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
    async getThreadKey(threadId) {
        return qs.parse(await this.lowLevel.getThreadKey(threadId));
    }
    async getComment(watchData) {
        let requestBody;
        if (watchData.video.isOfficial) {
            const keys = await this.getThreadKey(watchData.thread.ids.nicos || watchData.thread.ids.community);
        }
        else {
        }
    }
}
exports.Video = Video;
//# sourceMappingURL=Video.js.map