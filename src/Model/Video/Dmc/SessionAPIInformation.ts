export interface SessionAPIInformation {
    urls: Array<{
        url: string;
        is_well_known_port: boolean;
        is_ssl: boolean;
    }>;
    recipe_id: string;
    player_id: string;
    videos: Array<string>;
    audios: Array<string>;
    movies: Array<any>; // []
    protocols: Array<string>; // 'http'
    auth_types: {
        http: string; // 'ht2'
    };
    service_user_id: string; // '273108'
    token: string;
    signature: string;
    content_id: string; // 'out1'
    heartbeat_lifetime: number; // 60000
    content_key_timeout: number; // 600000
    priority: number; // 1
}
