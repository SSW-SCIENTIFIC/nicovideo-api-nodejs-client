import * as Request from "request";
import * as RequestPromise from "request-promise";
import * as http from "http";

import { WatchData } from "../Common/WatchData";
import { DmcSessionUtility } from "./Utility/DmcSessionUtility";

import * as VideoLow from "./LowLevel";

import { Session } from "../Session/Session";
import { Video as VideoAPI } from "../APIEntryPoints";
import * as APIUrl from "../APIUrls";
import {VideoInformation} from "./VideoInformation";
import Exception from "../Exception";
import {DmcSession} from "./Dmc/DmcSession";
import * as qs from "querystring";
import {DmcSessionResult} from "./Dmc/DmcSessionResult";

export * from "../Common";

export class Video {
    private lowLevel: VideoLow.Video;
    private request: typeof Request;
    private requestPromise: typeof RequestPromise;

    /**
     * Video API Client constructor.
     * @param {Session} session
     */
    public constructor(private session: Session) {
        this.request = Request.defaults({ jar: this.session.jar });
        this.requestPromise = RequestPromise.defaults({ jar: this.session.jar });
        this.lowLevel = new VideoLow.Video(this.session);
    }

    /**
     * Get WatchData from watch API.
     * @param {string} videoId
     * @returns {Promise<WatchData>}
     */
    public async getWatchData(videoId: string): Promise<WatchData> {
        return await this.lowLevel.getWatchData(videoId);
    }

    /**
     *
     * @param {string} videoId
     * @returns {Promise<Buffer>}
     */
    public async getVideoFromSmile(videoId: string): Promise<Buffer>;

    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<Buffer>}
     */
    public async getVideoFromSmile(watchData: WatchData): Promise<Buffer>;

    public async getVideoFromSmile(param: string | WatchData): Promise<Buffer> {
        let videoInfo: VideoInformation;

        if (typeof param == "string") {
            videoInfo = (await this.getWatchData(param)).video;
        } else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }

        return await this.requestPromise(VideoAPI.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url));
    }

    /**
     *
     * @param {string} videoId
     * @returns {Promise<request.Request>}
     */
    public async getVideoStreamFromSmile(videoId: string): Promise<Request.Request>;

    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<request.Request>}
     */
    public async getVideoStreamFromSmile(watchData: WatchData): Promise<Request.Request>;

    public async getVideoStreamFromSmile(param: string | WatchData): Promise<Request.Request> {
        let videoInfo: VideoInformation;

        if (typeof param === "string") {
            videoInfo = (await this.getWatchData(param)).video;
        } else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }

        return this.request(VideoAPI.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url));
    }

    /**
     * Create Session for DMC Server.
     * @param {WatchData} watchAPIData
     * @returns {Promise<DmcSessionResult>}
     */
    public async createDmcSession(watchAPIData: WatchData): Promise<DmcSessionResult> {
        if (!watchAPIData.video.dmcInfo) {
            throw new Exception();
        }

        return await this.lowLevel.createDmcSession(
            watchAPIData.video.id,
            watchAPIData.video.dmcInfo.session_api.urls[0].url,
            DmcSessionUtility.createSessionFromWatchAPIData(watchAPIData),
        );
    }

    /**
     *
     * @param {string} videoId
     * @returns {Promise<Buffer>}
     */
    public async getVideoFromDmc(videoId: string): Promise<Buffer>;

    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<Buffer>}
     */
    public async getVideoFromDmc(watchAPIData: WatchData): Promise<Buffer>;

    public async getVideoFromDmc(param: string | WatchData): Promise<Buffer> {
        let watchAPIData: WatchData;

        if (typeof param === "string") {
            watchAPIData = (await this.getWatchData(param));
        } else {
            watchAPIData = param;
        }

        if (!watchAPIData.video.dmcInfo) {
            throw new Exception();
        }

        const session: DmcSessionResult = await this.createDmcSession(watchAPIData);
        const id: string = watchAPIData.video.id;
        const apiUrl: string = watchAPIData.video.dmcInfo.session_api.urls[0].url;

        const intervalId: NodeJS.Timer = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
        }, session.keep_method.heartbeat.lifetime * 0.9);

        return this.requestPromise(VideoAPI.createDownloadFromDmcRequest(id, session.content_uri))
            .finally(() => clearInterval(intervalId));
    }

    /**
     *
     * @param {string} videoId
     * @returns {Promise<request.Request>}
     */
    public async getVideoStreamFromDmc(videoId: string): Promise<Request.Request>;

    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<request.Request>}
     */
    public async getVideoStreamFromDmc(watchAPIData: WatchData): Promise<Request.Request>;
    public async getVideoStreamFromDmc(param: string | WatchData): Promise<Request.Request> {
        let watchAPIData: WatchData;

        if (typeof param === "string") {
            watchAPIData = (await this.getWatchData(param));
        } else {
            watchAPIData = param;
        }

        if (!watchAPIData.video.dmcInfo) {
            throw new Exception();
        }

        const session: DmcSessionResult = await this.createDmcSession(watchAPIData);
        const id: string = watchAPIData.video.id;
        const apiUrl: string = watchAPIData.video.dmcInfo.session_api.urls[0].url;

        const intervalId: NodeJS.Timer = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
        }, session.keep_method.heartbeat.lifetime * 0.9);

        return this.request(
            VideoAPI.createDownloadFromDmcRequest(watchAPIData.video.id, session.content_uri),
            () => clearInterval(intervalId),
        );
    }

    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    public async getVideo(videoId: string) {
        const request = (await this.getVideoStreamFromDmc(videoId));
        request.on("response", (response: http.IncomingMessage) : void => {
            request.abort();

        });
    }

    public async getVideoStream() {

    }

    public async getComment(watchData: WatchData) {
        if (watchData.video.isOfficial) {
            const keys = await this.getThreadKey(watchData);
        } else {

        }
    }

    public async getThreadKey(threadId: number): Promise<string>;
    public async getThreadKey(watchData: WatchData): Promise<string>;
    public async getThreadKey(param: number | WatchData): Promise<string> {
        let threadId: number;

        if (typeof param === "number") {
            threadId = param;
        } else {
            threadId = param.thread.ids.nicos || param.thread.ids.community || param.thread.ids.default;
        }

        return this.lowLevel.getThreadKey(threadId);
    }
}
