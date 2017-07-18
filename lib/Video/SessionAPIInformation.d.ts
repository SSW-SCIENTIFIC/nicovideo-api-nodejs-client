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
    movies: Array<any>;
    protocols: Array<string>;
    auth_types: {
        http: string;
    };
    service_user_id: string;
    token: string;
    signature: string;
    content_id: string;
    heartbeat_lifetime: number;
    content_key_timeout: number;
    priority: number;
}
