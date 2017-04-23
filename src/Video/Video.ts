import * as QueryString from "querystring";
import { xml2js } from "xml-js";
import * as cheerio from "cheerio";
import * as Request from "request";
import * as RequestPromise from "request-promise";

import { FLVInfo } from "../Video/FLVInfo";
import { WatchAPIData } from "../Video/WatchAPIData";

import { Session } from "../Session/Session";
import { Video as VideoAPI } from "../APIEntryPoints";

export class Video {
    private request: typeof Request;
    private requestPromise: typeof RequestPromise;

    public constructor(private session: Session) {
        this.request = Request.defaults({ jar: this.session.jar });
        this.requestPromise = RequestPromise.defaults({ jar: this.session.jar });
    }

    public async getThumbInfo_Raw(movieId: string): Promise<string> {
        return this.requestPromise(VideoAPI.getthumbinfo(movieId));
    }

    public async getThumbInfo(movieId: string) {
        return xml2js(await this.getThumbInfo_Raw(movieId), { compact: true });
    }

    public async watchAPI_Raw(movieId: string): Promise<string> {
        return this.requestPromise(VideoAPI.watch(movieId));
    }

    public async getFLV_Raw(movieId: string) {
//        await this.watchAPI_Raw(movieId);
        return this.requestPromise(VideoAPI.getflv(movieId));
    }

    public async getFLV(movieId: string) {
        return QueryString.parse(await this.getFLV_Raw(movieId));
    }

    public async downloadFLV(movieId: string): Promise<Buffer> {
        let getFLVResult = await this.getFLV(movieId);
        await this.watchAPI_Raw(movieId);
        return this.requestPromise(VideoAPI.downloadflv(movieId, getFLVResult.url));
    }

    public async streamingFLV(movieId: string): Promise<Request.Request> {
        let getFLVResult = await this.getFLV(movieId);
        await this.watchAPI_Raw(movieId);
        return this.request(VideoAPI.downloadflv(movieId, getFLVResult.url));
    }

    public async watchAPIData(movieId: string) {
        let dom = cheerio.load(await this.watchAPI_Raw(movieId));
        return JSON.parse(dom("#watchAPIDataContainer").text());
    }

    public async dmcInfo(movieId: string) {
        let watchAPIData = (await this.watchAPIData(movieId)).flashvars;
        if (watchAPIData.isDmc !== 1) {
            throw new Error("No DMC Available.");
        }

        return JSON.parse(decodeURIComponent(watchAPIData.dmcInfo));
    }

    public async dmcSession(movieId: string, dmcInfo, session: any = {}): Promise<string> {
//        let dmcInfo = (await this.dmcInfo(movieId)).session_api;
        session = Object.assign({
            session: {
                recipe_id: dmcInfo.recipe_id,
                content_id: dmcInfo.content_id,
                content_type: "movie",
                content_src_id_sets: [
                    {
                        content_src_ids: [
                            {
                                src_id_to_mux: {
                                    video_src_ids: dmcInfo.videos,
                                    audio_src_ids: dmcInfo.audios
                                }
                            }
                        ]
                    }
                ],
                timing_constraint: "unlimited",
                keep_method: { heartbeat: { lifetime: 60000 } },
                protocol: {
                    name: dmcInfo.protocols[0],
                    parameters: {
                        http_parameters: {
                            parameters: {
                                http_output_download_parameters: {
                                    use_well_known_port: "no",
                                    use_ssl: "no"
                                }
                            }
                        }
                    }
                },
                content_uri: "",
                session_operation_auth: {
                    session_operation_auth_by_signature: {
                        token: decodeURIComponent(dmcInfo.token),
                        signature: dmcInfo.signature
                    }
                },
                content_auth: {
                    auth_type: dmcInfo.auth_types.http,
                    content_key_timeout: 600000,
                    service_id: "nicovideo",
                    service_user_id: dmcInfo.service_user_id
                },
                client_info: { player_id: dmcInfo.player_id },
                priority: 0.8
            }
        }, session);

        // return this.session.request({
        //     url: dmcInfo.api_urls[0] + "?_format=json",
        //     method: "options",
        //     headers: {
        //         "Access-Control-Request-Method": "POST",
        //         "Access-Control-Request-Headers": "content-type",
        //         "Origin": "http://www.nicovideo.jp"
        //     },
        // }).then((response) => {
            return this.requestPromise(VideoAPI.dmcsession(movieId, dmcInfo.api_urls[0], session));
    }

    public async dmcSessionData(movieId: string, dmcInfo) {
        return JSON.parse(await this.dmcSession(movieId, dmcInfo));
    }

    public async downloadDmc(movieId: string): Promise<Buffer> {
        let dmcInfo = (await this.dmcInfo(movieId)).session_api;
        let sessionData = (await this.dmcSessionData(movieId, dmcInfo)).data;

        let intervalId = setInterval(() => {
            console.log("beating...");
            return this.requestPromise(VideoAPI.dmcheartbeat(movieId, dmcInfo.api_urls[0], sessionData));
        }, sessionData.session.keep_method.heartbeat.lifetime * 0.9);

        return this.requestPromise(VideoAPI.downloaddmc(movieId, sessionData.session.content_uri))
            .finally(() => clearInterval(intervalId));
    }

    public async streamingDmc(movieId: string): Promise<Request.Request> {
        let dmcInfo = (await this.dmcInfo(movieId)).session_api;
        let sessionData = (await this.dmcSessionData(movieId, dmcInfo)).data;

        let intervalId = setInterval(() => {
            console.log("beating...");
            return this.requestPromise(VideoAPI.dmcheartbeat(movieId, dmcInfo.api_urls[0], sessionData));
        }, sessionData.session.keep_method.heartbeat.lifetime * 0.9);

        return this.request(VideoAPI.downloaddmc(movieId, sessionData.session.content_uri), () => clearInterval(intervalId));
    }
}
