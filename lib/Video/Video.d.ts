/// <reference types="node" />
/// <reference types="request" />
import * as Request from "request";
import { WatchData } from "../Common/WatchData";
import { Session } from "../Session/Session";
import { DmcSessionResult } from "./Dmc/DmcSessionResult";
export * from "../Common";
export declare class Video {
    private session;
    private lowLevel;
    private request;
    private requestPromise;
    /**
     * Video API Client constructor.
     * @param {Session} session
     */
    constructor(session: Session);
    /**
     * Get WatchData from watch API.
     * @param {string} videoId
     * @returns {Promise<WatchData>}
     */
    getWatchData(videoId: string): Promise<WatchData>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<Buffer>}
     */
    downloadFromSmile(videoId: string): Promise<Buffer>;
    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<Buffer>}
     */
    downloadFromSmile(watchData: WatchData): Promise<Buffer>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<request.Request>}
     */
    streamFromSmile(videoId: string): Promise<Request.Request>;
    /**
     *
     * @param {watchData} WatchData
     * @returns {Promise<request.Request>}
     */
    streamFromSmile(watchData: WatchData): Promise<Request.Request>;
    /**
     * Create Session for DMC Server.
     * @param {WatchData} watchAPIData
     * @returns {Promise<DmcSessionResult>}
     */
    createDmcSession(watchAPIData: WatchData): Promise<DmcSessionResult>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<Buffer>}
     */
    downloadFromDmc(videoId: string): Promise<Buffer>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<Buffer>}
     */
    downloadFromDmc(watchAPIData: WatchData): Promise<Buffer>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<request.Request>}
     */
    streamFromDmc(videoId: string): Promise<Request.Request>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<request.Request>}
     */
    streamFromDmc(watchAPIData: WatchData): Promise<Request.Request>;
    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    downloadVideo(videoId: string): Promise<void>;
    getComment(watchData: WatchData): Promise<void>;
}
