import * as QueryString from "querystring";
import { xml2js } from "xml-js";
import * as cheerio from "cheerio";
import * as Request from "request";
import * as RequestPromise from "request-promise";
import * as http from "http";

import { WatchData } from "./WatchAPIData";
import { DmcSessionUtility } from "./Utility/DmcSessionUtility";

import * as VideoLow from "./VideoLow";

import { Session } from "../Session/Session";
import { Video as VideoAPI } from "../APIEntryPoints";
import * as APIUrl from "../APIUrls";
import {VideoInformation} from "./VideoInformation";
import Exception from "../Exception";
import {DmcSession} from "./DmcSession";
import * as qs from "querystring";

export * from "./WatchAPIData";

export class Video {
    private lowLevel: VideoLow.Video;
    private request: typeof Request;
    private requestPromise: typeof RequestPromise;

    public constructor(private session: Session) {
        this.request = Request.defaults({ jar: this.session.jar });
        this.requestPromise = RequestPromise.defaults({ jar: this.session.jar });
        this.lowLevel = new VideoLow.Video(this.session);
    }

    public async getWatchData(videoId: string): Promise<WatchData> {
        return (await this.lowLevel.watchAPIData(videoId));
    }

    public async downloadFromSmile(videoId: string): Promise<Buffer>;
    public async downloadFromSmile(videoInfo: VideoInformation): Promise<Buffer>;
    public async downloadFromSmile(param: string | VideoInformation): Promise<Buffer> {
        let videoInfo: VideoInformation;

        if (typeof param === "string") {
            videoInfo = (await this.getWatchData(param)).video;
        } else {
            videoInfo = param;
            await this.lowLevel.watch(videoInfo.id);
        }

        return await this.requestPromise(VideoAPI.downloadsmile(videoInfo.id, videoInfo.smileInfo.url));
    }

    public async streamFromSmile(videoId: string): Promise<Request.Request>;
    public async streamFromSmile(videoInfo: VideoInformation): Promise<Request.Request>;
    public async streamFromSmile(param: string | VideoInformation): Promise<Request.Request> {
        let videoInfo: VideoInformation;

        if (typeof param === "string") {
            videoInfo = (await this.getWatchData(param)).video;
        } else {
            videoInfo = param;
            await this.lowLevel.watch(videoInfo.id);
        }

        return this.request(VideoAPI.downloadsmile(videoInfo.id, videoInfo.smileInfo.url));
    }

    public async createDmcSession(watchAPIData: WatchData): Promise<DmcSession> {
        if (!watchAPIData.video.dmcInfo) {
            throw new Exception();
        }
        return JSON.parse(await this.lowLevel.dmcSession(
            watchAPIData.video.id,
            watchAPIData.video.dmcInfo.session_api.urls[0].url,
            {session: DmcSessionUtility.createSessionFromWatchAPIData(watchAPIData)},
        )).data.session;
    }

    public async downloadFromDmc(videoId: string): Promise<Buffer>;
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

        const session: DmcSession = await this.createDmcSession(watchAPIData);
        const id: string = watchAPIData.video.id;
        const apiUrl: string = watchAPIData.video.dmcInfo.session_api.urls[0].url;

        const intervalId: NodeJS.Timer = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.dmcHeartbeat(id, apiUrl, session)
        }, session.keep_method.heartbeat.lifetime * 0.9);

        return this.requestPromise(VideoAPI.downloaddmc(id, session.content_uri))
            .finally(() => clearInterval(intervalId));
    }

    public async streamFromDmc(videoId: string): Promise<Request.Request>;
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

        const session: DmcSession = await this.createDmcSession(watchAPIData);
        const id: string = watchAPIData.video.id;
        const apiUrl: string = watchAPIData.video.dmcInfo.session_api.urls[0].url;

        const intervalId: NodeJS.Timer = setInterval(() => {
            console.log("beating...");
            return this.lowLevel.dmcHeartbeat(id, apiUrl, session)
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

    public async getThreadKey(threadId: string): Promise<{ threadkey: string, force_184: string }> {
         return qs.parse(await this.lowLevel.getThreadKey(threadId));
    }

    public async getComment(watchAPIData: WatchData) {
        let requestBody;

        if (watchAPIData.video.isOfficial) {
            const keys = await this.getThreadKey(watchAPIData.thread.ids.nicos || watchAPIData.thread.ids.community);
        } else {

        }
    }
}
