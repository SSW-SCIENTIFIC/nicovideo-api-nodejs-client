/// <reference types="node" />
/// <reference types="request" />
import * as Request from "request";
import { WatchData } from "./WatchAPIData";
import { Session } from "../Session/Session";
import { VideoInformation } from "./VideoInformation";
import { DmcSession } from "./DmcSession";
export * from "./WatchAPIData";
export declare class Video {
    private session;
    private lowLevel;
    private request;
    private requestPromise;
    constructor(session: Session);
    getWatchData(videoId: string): Promise<WatchData>;
    downloadFromSmile(videoId: string): Promise<Buffer>;
    downloadFromSmile(videoInfo: VideoInformation): Promise<Buffer>;
    streamFromSmile(videoId: string): Promise<Request.Request>;
    streamFromSmile(videoInfo: VideoInformation): Promise<Request.Request>;
    createDmcSession(watchAPIData: WatchData): Promise<DmcSession>;
    downloadFromDmc(videoId: string): Promise<Buffer>;
    downloadFromDmc(watchAPIData: WatchData): Promise<Buffer>;
    streamFromDmc(videoId: string): Promise<Request.Request>;
    streamFromDmc(watchAPIData: WatchData): Promise<Request.Request>;
    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    downloadVideo(videoId: string): Promise<void>;
    getThreadKey(threadId: string): Promise<{
        threadkey: string;
        force_184: string;
    }>;
    getComment(watchAPIData: WatchData): Promise<void>;
}
