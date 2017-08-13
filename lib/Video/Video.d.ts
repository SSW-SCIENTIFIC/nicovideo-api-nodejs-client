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
    getVideoFromSmile(videoId: string): Promise<Buffer>;
    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<Buffer>}
     */
    getVideoFromSmile(watchData: WatchData): Promise<Buffer>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromSmile(videoId: string): Promise<Request.Request>;
    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromSmile(watchData: WatchData): Promise<Request.Request>;
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
    getVideoFromDmc(videoId: string): Promise<Buffer>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<Buffer>}
     */
    getVideoFromDmc(watchAPIData: WatchData): Promise<Buffer>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromDmc(videoId: string): Promise<Request.Request>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromDmc(watchAPIData: WatchData): Promise<Request.Request>;
    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    getVideo(videoId: string): Promise<void>;
    getVideoStream(): Promise<void>;
    getComment(watchData: WatchData): Promise<void>;
    getThreadKey(threadId: number): Promise<string>;
    getThreadKey(watchData: WatchData): Promise<string>;
}
