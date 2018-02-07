import * as QueryString from "querystring";
import {xml2js} from "xml-js";
import * as cheerio from "cheerio";

import { WatchData } from "../Common/WatchData";

import { Session } from "../Session/Session";
import { Live as LiveAPI } from "../APIEntryPoints";
import * as APIUrl from "../APIUrls";
import {AxiosRequestConfig} from "axios";

/**
 * Access nicovideo.jp Level API Directly.
 */
export class Live {
    /**
     * @constructor
     * @param {Session} session
     */
    public constructor(private session: Session) {
        // do nothing
    }

    /**
     * Access live-watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    public async getLiveWatchPage(videoId: string, isHTML5: boolean = true): Promise<string> {
        const options: AxiosRequestConfig =LiveAPI.createLiveWatchRequest(videoId);

        options.headers = options.headers || {};
        const cookies = ([options.headers.Cookie] || []);
        cookies.push(
            "watch_html5=" + (isHTML5 ? 1 : 0),
            "watch_flash=" + (isHTML5 ? 0 : 1),
        );

        options.headers.Cookie = cookies.join("; ");

        return (await this.session.client.request(options)).data;
    }

    /**
     * Get watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    public async getWatchData(videoId: string, isHTML5: boolean = true): Promise<WatchData> {
        let dom = cheerio.load(await this.getWatchPage(videoId, isHTML5));

        return isHTML5 ?
            JSON.parse(dom("#js-initial-watch-data").attr("data-api-data") || "{}") :
            JSON.parse(dom("#watchAPIDataContainer").text() || "{}");
    }
}
