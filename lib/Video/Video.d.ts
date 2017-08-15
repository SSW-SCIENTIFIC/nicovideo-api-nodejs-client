/// <reference types="node" />
import { WatchData } from "../Common/WatchData";
import { Session } from "../Session/Session";
import { DmcSessionResult } from "./Dmc/DmcSessionResult";
import { ThreadKey } from "./ThreadKey";
import * as stream from "stream";
export * from "../Common";
export declare class Video {
    private session;
    private lowLevel;
    /**
     * @constructor
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
    getVideoStreamFromSmile(videoId: string): Promise<stream.Readable>;
    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromSmile(watchData: WatchData): Promise<stream.Readable>;
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
    getVideoStreamFromDmc(videoId: string): Promise<stream.Readable>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromDmc(watchAPIData: WatchData): Promise<stream.Readable>;
    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    getVideo(videoId: string): Promise<void>;
    getVideoStream(): Promise<void>;
    getComment(watchData: WatchData): Promise<void>;
    getThreadKey(threadId: number): Promise<ThreadKey>;
    getThreadKey(watchData: WatchData): Promise<ThreadKey>;
}
