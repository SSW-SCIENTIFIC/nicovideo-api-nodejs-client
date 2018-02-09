import { WatchData } from "../../Model/Common/";
import { Session } from "../Session/";
/**
 * Access nicovideo.jp Level API Directly.
 */
export declare class Live {
    private session;
    /**
     * @constructor
     * @param {Session} session
     */
    constructor(session: Session);
    /**
     * Access live-watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    getLiveWatchPage(videoId: string, isHTML5?: boolean): Promise<string>;
    /**
     * Get watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    getLiveWatchData(videoId: string, isHTML5?: boolean): Promise<WatchData>;
}
