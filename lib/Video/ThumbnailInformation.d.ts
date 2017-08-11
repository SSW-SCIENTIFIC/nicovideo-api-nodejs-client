export interface ThumbnailInformationSuccess {
    _declaration?: {
        _attributes: {
            version: string;
            encoding: string;
        };
    };
    nicovideo_thumb_response: {
        _attributes: {
            status: string;
        };
        thumb: {
            video_id: {
                _text: string;
            };
            title: {
                _text: string;
            };
            description: {
                _text: string;
            };
            thumbnail_url: {
                _text: string;
            };
            first_retrieve: {
                _text: string;
            };
            length: {
                _text: string;
            };
            movie_type: {
                _text: string;
            };
            size_high: {
                _text: number;
            };
            size_low: {
                _text: number;
            };
            view_counter: {
                _text: number;
            };
            comment_num: {
                _text: number;
            };
            mylist_counter: {
                _text: number;
            };
            last_res_body: {
                _text: string;
            };
            watch_url: {
                _text: string;
            };
            thumb_type: {
                _text: string;
            };
            embeddable: {
                _text: number;
            };
            no_live_play: {
                _text: number;
            };
            tags: {
                _attributes: {
                    domain: string;
                };
                tag: [[Object], [Object], [Object], [Object], [Object]];
            };
            user_id: {
                _text: number;
            };
            user_nickname: {
                _text: string;
            };
            user_icon_url: {
                _text: string;
            };
        };
    };
}
export interface ThumbnailInformationFailure {
    _declaration?: {
        _attributes: {
            version: string;
            encoding: string;
        };
    };
    nicovideo_thumb_response: {
        _attributes: {
            status: string;
        };
        error: {
            code: {
                _text: string;
            };
            description: {
                _text: string;
            };
        };
    };
}
export declare type ThumbnailInformation = ThumbnailInformationSuccess | ThumbnailInformationFailure;
