import * as QueryString from "querystring";
import {xml2js} from "xml-js";
import * as cheerio from "cheerio";
import * as Request from "request";
import * as RequestPromise from "request-promise";

import { WatchData } from "../Common/WatchData";

import { Session } from "../Session/Session";
import { Video as VideoAPI } from "../APIEntryPoints";
import * as APIUrl from "../APIUrls";
import { DmcSession } from "./DmcSession";
import {DmcSessionResult} from "./DmcSessionResult";

type Request = typeof Request;
type RequestPromise = typeof RequestPromise;

/**
 * Access nicovideo.jp APIs and Returns response directly.
 */
export class Video {
    private request: Request;
    private requestPromise: RequestPromise;

    /**
     * @constructor
     * @param {Session} session
     */
    public constructor(private session: Session) {
        this.request = Request.defaults({jar: session.jar});
        this.requestPromise = RequestPromise.defaults({jar: session.jar});
    }

    /**
     * Access to getthhumbinfo API and returns response body.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    public async getThumbInfo(videoId: string): Promise<string> {
        return await this.requestPromise(VideoAPI.getthumbinfo(videoId));
    }

    /**
     * Access to getflv API and returns response body.
     * @param videoId
     * @returns {Promise<string>}
     */
    public async getFLV(videoId: string): Promise<string> {
        return await this.requestPromise(VideoAPI.getflv(videoId));
    }

    /**
     * Access to watch API and returns response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    public async getWatchPage(videoId: string, isHTML5: boolean = true): Promise<string> {
        this.session.jar.setCookie(this.request.cookie("watch_html5=" + (isHTML5 ? "1" : "0")), APIUrl.WATCH + videoId);
        return await this.requestPromise(VideoAPI.watch(videoId));
    }

    /**
     * Returns watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    public async getWatchData(videoId: string, isHTML5: boolean = true): Promise<object> {
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
                VideoAPI.dmcsession(videoId, apiUrl, JSON.stringify({session: session}))
            )
        );
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
            VideoAPI.dmcheartbeat(videoId, apiUrl, session.id, JSON.stringify({session: session}))
        );
    }

    public async getThreadKey(threadId: string): Promise<string> {
        return await this.requestPromise(VideoAPI.getthreadkey(threadId));
    }

    public readonly getComment: (body: string) => Promise<string> = this.getCommentJSON;

    public async getCommentJSON(body: string): Promise<string> {
        return await this.requestPromise(VideoAPI.getcommentjson(body));
    }

    public async getCommentXML(body: string): Promise<string> {
        return await this.requestPromise(VideoAPI.getcommentxml(body));
    }
}
