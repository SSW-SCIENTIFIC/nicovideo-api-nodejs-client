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
     * @param {() => void} progressHandler
     * @returns {Promise<Buffer>}
     */
    getVideoFromSmile(videoId: string, progressHandler: () => void): Promise<Buffer>;
    /**
     *
     * @param {WatchData} watchData
     * @param {() => void} progressHandler
     * @returns {Promise<Buffer>}
     */
    getVideoFromSmile(watchData: WatchData, progressHandler: () => void): Promise<Buffer>;
    /**
     *
     * @param {string} videoId
     * @param {() => void} progressHandler
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromSmile(videoId: string, progressHandler: () => void): Promise<stream.Readable>;
    /**
     *
     * @param {WatchData} watchData
     * @param {() => void} progressHandler
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromSmile(watchData: WatchData, progressHandler: () => void): Promise<stream.Readable>;
    /**
     * Create Session for DMC Server.
     * @param {WatchData} watchAPIData
     * @returns {Promise<DmcSessionResult>}
     */
    createDmcSession(watchAPIData: WatchData): Promise<DmcSessionResult>;
    /**
     *
     * @param {string} videoId
     * @param {() => void} progressHandler
     * @returns {Promise<Buffer>}
     */
    getVideoFromDmc(videoId: string, progressHandler: () => void): Promise<Buffer>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @param {() => void} progressHandler
     * @returns {Promise<Buffer>}
     */
    getVideoFromDmc(watchAPIData: WatchData, progressHandler: () => void): Promise<Buffer>;
    /**
     *
     * @param {string} videoId
     * @param {() => void} progressHandler
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromDmc(videoId: string, progressHandler: () => void): Promise<stream.Readable>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @param {() => void} progressHandler
     * @returns {Promise<request.Request>}
     */
    getVideoStreamFromDmc(watchAPIData: WatchData, progressHandler: () => void): Promise<stream.Readable>;
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
