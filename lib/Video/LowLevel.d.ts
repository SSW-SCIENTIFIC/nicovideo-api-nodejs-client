import { Session } from "../Session/Session";
import { DmcSession } from "./DmcSession";
import { DmcSessionResult } from "./DmcSessionResult";
/**
 * Access nicovideo.jp APIs and Returns response directly.
 */
export declare class Video {
    private session;
    private request;
    private requestPromise;
    /**
     * @constructor
     * @param {Session} session
     */
    constructor(session: Session);
    /**
     * Access to getthhumbinfo API and returns response body.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    getThumbInfo(videoId: string): Promise<string>;
    /**
     * Access to getflv API and returns response body.
     * @param videoId
     * @returns {Promise<string>}
     */
    getFLV(videoId: string): Promise<string>;
    /**
     * Access to watch API and returns response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    getWatchPage(videoId: string, isHTML5?: boolean): Promise<string>;
    /**
     * Returns watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    getWatchData(videoId: string, isHTML5?: boolean): Promise<object>;
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} session
     * @returns {Promise<DmcSessionResult>}
     */
    createDmcSession(videoId: string, apiUrl: string, session: DmcSession): Promise<DmcSessionResult>;
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} session
     * @returns {Promise<DmcSessionResult>}
     */
    sendDmcHeartbeat(videoId: string, apiUrl: string, session: DmcSessionResult): Promise<DmcSessionResult>;
    getThreadKey(threadId: string): Promise<string>;
    readonly getComment: (body: string) => Promise<string>;
    getCommentJSON(body: string): Promise<string>;
    getCommentXML(body: string): Promise<string>;
}
