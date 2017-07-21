import {DmcSession} from "./DmcSession";

export interface DmcSessionResult extends DmcSession{
    id: string,
    recipe_id: string,
    content_id: string,
    content_src_id_sets: Array<{
        content_src_ids: Array<{
            src_id_to_mux: {
                video_src_ids: Array<string>,
                audio_src_ids: Array<string>,
            },
        }>,
    }>,
    content_type: string,
    timing_constraint: string,
    keep_method: {
        heartbeat: {
            lifetime: number,
        },
    },
    protocol: {
        name: string,
        parameters: {
            http_parameters: {
                parameters: {
                    http_output_download_parameters: {
                        use_well_known_port: string,
                        use_ssl: string,
                    },
                },
            },
        },
    },
    play_seek_time: number,
    play_speed: number,
    content_uri: string,
    session_operation_auth: {
        session_operation_auth_by_signature: {
            token: string,
            signature: string,
        },
    },
    content_auth: {
        auth_type: string,
        content_key_timeout: number,
        service_id: string,
        service_user_id: string,
    },
    runtime_info: {
        node_id: string,
        execution_history: Array<any>
    },
    client_info: {
        player_id: string,
    },
    created_time: number,
    modified_time: number,
    priority: number,
    content_route: number,
    version: string,
    content_status: string,
}