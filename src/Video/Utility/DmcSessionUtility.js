"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = require("../../Exception");
var DmcSessionUtility = (function () {
    function DmcSessionUtility() {
    }
    DmcSessionUtility.createSessionFromWatchAPIData = function (watchAPIData) {
        if (!watchAPIData.video.dmcInfo) {
            throw new Exception_1.default();
        }
        var sessionAPIInfo = watchAPIData.video.dmcInfo.session_api;
        var isPremium = watchAPIData.viewer.isPremium || false;
        var isOfficial = watchAPIData.video.isOfficial || false;
        return {
            recipe_id: sessionAPIInfo.recipe_id,
            content_id: sessionAPIInfo.content_id,
            content_type: "movie",
            content_src_id_sets: [
                {
                    content_src_ids: [
                        {
                            src_id_to_mux: {
                                video_src_ids: sessionAPIInfo.videos,
                                audio_src_ids: sessionAPIInfo.audios
                            }
                        }
                    ]
                }
            ],
            timing_constraint: "unlimited",
            keep_method: {
                heartbeat: {
                    lifetime: sessionAPIInfo.heartbeat_lifetime,
                }
            },
            protocol: {
                name: sessionAPIInfo.protocols[0],
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
                    token: decodeURIComponent(sessionAPIInfo.token),
                    signature: sessionAPIInfo.signature
                }
            },
            content_auth: {
                auth_type: sessionAPIInfo.auth_types.http,
                content_key_timeout: sessionAPIInfo.content_key_timeout,
                service_id: "nicovideo",
                service_user_id: sessionAPIInfo.service_user_id
            },
            client_info: {
                player_id: sessionAPIInfo.player_id
            },
            priority: 0.4 + (isPremium ? 0.4 : 0) + (isOfficial ? 0.2 : 0),
        };
    };
    return DmcSessionUtility;
}());
exports.DmcSessionUtility = DmcSessionUtility;
