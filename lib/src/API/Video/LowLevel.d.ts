import { WatchData } from "../../Model/Common";
import { Session } from "../Session";
import { DmcSession } from "../../Model/Video/DMC/DmcSession";
import { DmcSessionResult } from "../../Model/Video/DMC/DmcSessionResult";
import { ThumbnailInformation } from "../../Model/Video/ThumbnailInformation";
import { FlvInformation } from "../../Model/Video/FlvInformation";
import { ThreadKey } from "../../Model/Video/ThreadKey";
import { CommentRequest } from "../../Model/Video/CommentRequest";
/**
 * Access nicovideo.jp Level API Directly.
 */
export declare class Video {
    private session;
    /**
     * @constructor
     * @param {Session} session
     */
    constructor(session: Session);
    /**
     * Access getthhumbinfo API and get parsed object.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    getThumbInfo(videoId: string): Promise<ThumbnailInformation>;
    /**
     * Access getflv API and get parsed object.
     * @param videoId
     * @returns {Promise<string>}
     */
    getFlv(videoId: string): Promise<FlvInformation>;
    /**
     * Access watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    getWatchPage(videoId: string, isHTML5?: boolean): Promise<string>;
    /**
     * Get watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    getWatchData(videoId: string, isHTML5?: boolean): Promise<WatchData>;
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
    getThreadKey(threadId: number): Promise<ThreadKey>;
    readonly getComment: (request: CommentRequest) => Promise<string>;
    getCommentByJson(request: CommentRequest): Promise<string>;
    getCommentByXML(body: string): Promise<string>;
    getWaybackKey(threadId: number): Promise<string>;
}
