import { WatchData } from "../../Model/Common";
import { Session } from "../Session";
import { DmcSessionResult } from "../../Model/Video/DMC/DmcSessionResult";
import { ThreadKey } from "../../Model/Video/ThreadKey";
import { AxiosResponse } from "axios";
export * from "../../Model/Common/index";
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
     * @returns {Promise<AxiosResponse>}
     */
    getVideoFromSmile(videoId: string): Promise<AxiosResponse>;
    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<AxiosResponse>}
     */
    getVideoFromSmile(watchData: WatchData): Promise<AxiosResponse>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<AxiosResponse>}
     */
    getVideoStreamFromSmile(videoId: string): Promise<AxiosResponse>;
    /**
     *
     * @param {WatchData} watchData
     * @returns {Promise<AxiosResponse>}
     */
    getVideoStreamFromSmile(watchData: WatchData): Promise<AxiosResponse>;
    /**
     * Create Session for DMC Server.
     * @param {WatchData} watchAPIData
     * @returns {Promise<DmcSessionResult>}
     */
    createDmcSession(watchAPIData: WatchData): Promise<DmcSessionResult>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<AxiosResponse>}
     */
    getVideoFromDmc(videoId: string): Promise<AxiosResponse>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<AxiosResponse>}
     */
    getVideoFromDmc(watchAPIData: WatchData): Promise<AxiosResponse>;
    /**
     *
     * @param {string} videoId
     * @returns {Promise<AxiosResponse>}
     */
    getVideoStreamFromDmc(videoId: string): Promise<AxiosResponse>;
    /**
     *
     * @param {WatchData} watchAPIData
     * @returns {Promise<AxiosResponse>}
     */
    getVideoStreamFromDmc(watchAPIData: WatchData): Promise<AxiosResponse>;
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
