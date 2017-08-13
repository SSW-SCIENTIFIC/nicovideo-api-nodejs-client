import * as QueryString from "querystring";
import {xml2js} from "xml-js";
import * as cheerio from "cheerio";
import * as Request from "request";
import * as RequestPromise from "request-promise";

import { WatchData } from "../Common/WatchData";

import { Session } from "../Session/Session";
import { Video as VideoAPI } from "../APIEntryPoints";
import * as APIUrl from "../APIUrls";
import { DmcSession } from "./Dmc/DmcSession";
import {DmcSessionResult} from "./Dmc/DmcSessionResult";
import {ThumbnailInformation} from "./ThumbnailInformation";
import {FlvInformation} from "./FlvInformation";
import {ThreadKey} from "./ThreadKey";

/**
 * Access nicovideo.jp Level API Directly.
 */
export class Video {
    private request: typeof Request;
    private requestPromise: typeof RequestPromise;

    /**
     * @constructor
     * @param {Session} session
     */
    public constructor(private session: Session) {
        this.request = Request.defaults({jar: session.jar});
        this.requestPromise = RequestPromise.defaults({jar: session.jar});
    }

    /**
     * Access getthhumbinfo API and get parsed object.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    public async getThumbInfo(videoId: string): Promise<ThumbnailInformation> {
        return xml2js(
            await this.requestPromise(VideoAPI.createGetThumbInfoRequest(videoId)),
            { compact: true },
        );
    }

    /**
     * Access getflv API and get parsed object.
     * @param videoId
     * @returns {Promise<string>}
     */
    public async getFlv(videoId: string): Promise<FlvInformation> {
        return QueryString.parse(await this.requestPromise(VideoAPI.createGetFlvRequest(videoId)));
    }

    /**
     * Access watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    public async getWatchPage(videoId: string, isHTML5: boolean = true): Promise<string> {
        this.session.jar.setCookie(this.request.cookie("watch_html5=" + (isHTML5 ? "1" : "0")), APIUrl.WATCH + videoId);
        return await this.requestPromise(VideoAPI.createWatchRequest(videoId));
    }

    /**
     * Get watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    public async getWatchData(videoId: string, isHTML5: boolean = true): Promise<WatchData> {
        let dom = cheerio.load(await this.getWatchPage(videoId, isHTML5).catch((err) => ""));
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
    public async createDmcSession(videoId: string, apiUrl: string, session: DmcSession): Promise<DmcSessionResult> {
        return JSON.parse(
            await this.requestPromise(
                VideoAPI.createDmcSessionRequest(videoId, apiUrl, session),
            )
        ).data.session;
    }

    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} session
     * @returns {Promise<DmcSessionResult>}
     */
    public async sendDmcHeartbeat(videoId: string, apiUrl: string, session: DmcSessionResult): Promise<DmcSessionResult> {
        return await this.requestPromise(
            VideoAPI.createDmcHeartbeatRequest(videoId, apiUrl, session)
        );
    }

    public async getThreadKey(threadId: number): Promise<string> {
        return QueryString.parse(await this.requestPromise(VideoAPI.createGetThreadKeyRequest(threadId))).thread_key;
    }

    public readonly getComment: (body: string) => Promise<string> = this.getCommentByJson;

    public async getCommentByJson(body: string): Promise<string> {
        return await this.requestPromise(VideoAPI.createGetCommentByJsonRequest(body));
    }

    public async getCommentByXML(body: string): Promise<string> {
        return await this.requestPromise(VideoAPI.createGetCommentByXMLRequest(body));
    }

    public async getWaybackKey(threadId: number): Promise<ThreadKey> {
        const result = QueryString.parse(await this.requestPromise(VideoAPI.createGetWaybackKeyRequest(threadId))).waybackkey;
        return { key: result.thread_key, force_184: result.force_184 == 1 };
    }
}
