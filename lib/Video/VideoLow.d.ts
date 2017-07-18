import { WatchData } from "./WatchAPIData";
import { Session } from "../Session/Session";
import { DmcSession } from "./DmcSession";
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
     * Access to watch API and returns response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    watch(videoId: string, isHTML5?: boolean): Promise<string>;
    /**
     * Access to getflv API and returns response body.
     * @param videoId
     * @returns {Promise<string>}
     */
    getFLV(videoId: string): Promise<string>;
    /**
     * Returns watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    watchAPIData(videoId: string, isHTML5?: boolean): Promise<WatchData>;
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {object} body
     * @returns {Promise<string>}
     */
    dmcSession(videoId: string, apiUrl: string, body: object): Promise<string>;
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} dmcSession
     * @returns {Promise<string>}
     */
    dmcHeartbeat(videoId: string, apiUrl: string, dmcSession: DmcSession): Promise<string>;
    getThreadKey(threadId: string): Promise<string>;
    getComment(body: string): Promise<string>;
    getCommentJSON(body: string): Promise<string>;
}
