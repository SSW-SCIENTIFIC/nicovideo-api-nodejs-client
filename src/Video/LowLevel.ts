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
import {CommentRequest} from "./CommentRequest";
import {AxiosRequestConfig} from "axios";

/**
 * Access nicovideo.jp Level API Directly.
 */
export class Video {
    /**
     * @constructor
     * @param {Session} session
     */
    public constructor(private session: Session) {
        // do nothing
    }

    /**
     * Access getthhumbinfo API and get parsed object.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    public async getThumbInfo(videoId: string): Promise<ThumbnailInformation> {
        return xml2js(
            (await this.session.client.request(VideoAPI.createGetThumbInfoRequest(videoId))).data,
            { compact: true },
        );
    }

    /**
     * Access getflv API and get parsed object.
     * @param videoId
     * @returns {Promise<string>}
     */
    public async getFlv(videoId: string): Promise<FlvInformation> {
        return QueryString.parse(
            (await this.session.client.request(VideoAPI.createGetFlvRequest(videoId))).data
        );
    }

    /**
     * Access watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    public async getWatchPage(videoId: string, isHTML5: boolean = true): Promise<string> {
        const options: AxiosRequestConfig = VideoAPI.createWatchRequest(videoId);

        options.headers = options.headers || {};
        options.headers["Set-Cookie"] = QueryString.stringify({
            watch_html5: isHTML5 ? 1 : 0,
            watch_flash: isHTML5 ? 0 : 1,
        });

        return (await this.session.client.request(VideoAPI.createWatchRequest(videoId))).data;
    }

    /**
     * Get watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    public async getWatchData(videoId: string, isHTML5: boolean = true): Promise<WatchData> {
        let dom = cheerio.load(await this.getWatchPage(videoId, isHTML5));

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
        return (await this.session.client.request(
            VideoAPI.createDmcSessionRequest(videoId, apiUrl, session),
        )).data.data.session;
    }

    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} session
     * @returns {Promise<DmcSessionResult>}
     */
    public async sendDmcHeartbeat(videoId: string, apiUrl: string, session: DmcSessionResult): Promise<DmcSessionResult> {
        return (await this.session.client.request(
            VideoAPI.createDmcHeartbeatRequest(videoId, apiUrl, session),
        )).data.data.session;
    }

    public async getThreadKey(threadId: number): Promise<ThreadKey> {
        const result = QueryString.parse(
            (await this.session.client.request(VideoAPI.createGetThreadKeyRequest(threadId))).data,
        );
        return { key: result.threadkey, force_184: result.force_184 == 1 };
    }

    public readonly getComment: (request: CommentRequest) => Promise<string> = this.getCommentByJson;

    public async getCommentByJson(request: CommentRequest): Promise<string> {
        return (await this.session.client.request(VideoAPI.createGetCommentByJsonRequest(request))).data;
    }

    public async getCommentByXML(body: string): Promise<string> {
        return (await this.session.client.request(VideoAPI.createGetCommentByXMLRequest(body))).data;
    }

    public async getWaybackKey(threadId: number): Promise<string> {
        return QueryString.parse(
            (await this.session.client.request(VideoAPI.createGetWaybackKeyRequest(threadId))).data,
        ).waybackkey;
    }
}
