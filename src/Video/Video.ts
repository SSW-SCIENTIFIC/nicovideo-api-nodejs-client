import * as QueryString from "querystring";
import { xml2js } from "xml-js";
import * as cheerio from "cheerio";
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
import {DmcSession} from "./DmcSession";
import * as qs from "querystring";
import {DmcSessionResult} from "./DmcSessionResult";

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
        return (await this.lowLevel.getWatchData(videoId) as WatchData);
    }

    /**
     *
     * @param {string} videoId
     * @returns {Promise<Buffer>}
     */
    public async downloadFromSmile(videoId: string): Promise<Buffer>;

    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<Buffer>}
     */
    public async downloadFromSmile(watchData: WatchData): Promise<Buffer>;

    public async downloadFromSmile(param: string | WatchData): Promise<Buffer> {
        let videoInfo: VideoInformation;

        if (typeof param == "string") {
            videoInfo = (await this.getWatchData(param)).video;
        } else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }

        return await this.requestPromise(VideoAPI.downloadsmile(videoInfo.id, videoInfo.smileInfo.url));
    }

    /**
     *
     * @param {string} videoId
     * @returns {Promise<request.Request>}
     */
    public async streamFromSmile(videoId: string): Promise<Request.Request>;

    /**
     *
     * @param {watchData} WatchData
     * @returns {Promise<request.Request>}
     */
    public async streamFromSmile(watchData: WatchData): Promise<Request.Request>;

    public async streamFromSmile(param: string | WatchData): Promise<Request.Request> {
        let videoInfo: VideoInformation;

        if (typeof param === "string") {
            videoInfo = (await this.getWatchData(param)).video;
        } else {
            videoInfo = param.video;
            await this.lowLevel.getWatchPage(videoInfo.id);
        }

        return this.request(VideoAPI.downloadsmile(videoInfo.id, videoInfo.smileInfo.url));
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
        return JSON.parse(await this.lowLevel.createDmcSession(
            watchAPIData.video.id,
            watchAPIData.video.dmcInfo.session_api.urls[0].url,
            JSON.stringify({session: DmcSessionUtility.createSessionFromWatchAPIData(watchAPIData)}),
        )).data.session;
    }

    /**
     *
     * @param {string} videoId
     * @returns {Promise<Buffer>}
     */
    public async downloadFromDmc(videoId: string): Promise<Buffer>;

    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<Buffer>}
     */
    public async downloadFromDmc(watchAPIData: WatchData): Promise<Buffer>;

    public async downloadFromDmc(param: string | WatchData): Promise<Buffer> {
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
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session.id, JSON.stringify({session: session}))
        }, session.keep_method.heartbeat.lifetime * 0.9);

        return this.requestPromise(VideoAPI.downloaddmc(id, session.content_uri))
            .finally(() => clearInterval(intervalId));
    }

    /**
     *
     * @param {string} videoId
     * @returns {Promise<request.Request>}
     */
    public async streamFromDmc(videoId: string): Promise<Request.Request>;

    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<request.Request>}
     */
    public async streamFromDmc(watchAPIData: WatchData): Promise<Request.Request>;
    public async streamFromDmc(param: string | WatchData): Promise<Request.Request> {
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
            return this.lowLevel.sendDmcHeartbeat(id, apiUrl, session.id, JSON.stringify({session: session}))
        }, session.keep_method.heartbeat.lifetime * 0.9);

        return this.request(
            VideoAPI.downloaddmc(watchAPIData.video.id, session.content_uri),
            () => clearInterval(intervalId),
        );
    }

    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    public async downloadVideo(videoId: string) {
        const request = (await this.streamFromDmc(videoId));
        request.on("response", (response: http.IncomingMessage) : void => {
            request.abort();

        });
    }

    public async getComment(watchData: WatchData) {
        if (watchData.video.isOfficial) {
            const keys = await this.getThreadKey(watchData.thread.ids.nicos || watchData.thread.ids.community);
        } else {

        }
    }
}
