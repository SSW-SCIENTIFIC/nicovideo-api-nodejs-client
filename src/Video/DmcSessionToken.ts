export interface DmcSessionToken {
    service_id: string;
    player_id: string;
    recipe_id: string;
    service_user_id: number;
    protocols: Array<{
        name: string,
        auth_type: string,
    }>;
    videos: Array<string>;
    audios: Array<string>;
    movies: Array<string>;
    created_time: number,
    expire_time: number,
    content_ids: Array<string>;
    heartbeat_lifetime: number;  // 60000
    content_key_timeout: number; // 600000
    priority: number;
    transfer_presets: Array<any>;
}
