import { SessionAPIInformation } from "./SessionAPIInformation";

export interface DmcInformation {
    time: number;
    time_ms: number;
    video: {
        video_id: string;
        length_seconds: string;
        deleted: number; // 0
    };
    thread: {
        server_url: string;
        sub_server_url: string;
        thread_id: number;
        nicos_thread_id?: any;
        optional_thread_id: number;
        thread_key_required: boolean;
        channel_ng_words: Array<any>; // []
        owner_ng_words: Array<any>; // []
        maintenances_ng: boolean;
        postkey_available: boolean;
        ng_revision: number;
    };
    user: {
        user_id: number;
        is_premium: boolean;
        nickname: string;
    };
    hiroba: {
        fms_token?: any;
        server_url: string;
        server_port: number;
        thread_id: number;
        thread_key: string;
    };
    error?: any;
    session_api: SessionAPIInformation;
    quality?: {
        videos: Array<{
            id: string;
            available: boolean;
            bitrate: number; // 1000000, 600000, 300000 for example
            resolution: {
                width: number;
                height: number;
            };
        }>;
        audios: Array<{
            id: string;
            available: boolean;
            bitrate: number;
            sampling_rate: number; // 0.1, 0.6, 0.8, 1
        }>;
    };
}
