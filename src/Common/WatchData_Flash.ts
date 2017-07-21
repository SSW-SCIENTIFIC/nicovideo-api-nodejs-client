export interface WatchData_Flash {
    flashvars: {
        watchAuthKey: string,
        flvInfo: string,
        isDmc: boolean,
        dmcInfo: string,
        isBackComment: boolean,
        thumbTitle: string,
        thumbDescription: string,
        videoTitle: string,
        player_version_xml: number,
        player_info_xml: number,
        appli_promotion_info_xml: number,
        user_blank_icon_url: string,
        translation_version_json: number,
        userPrefecture: number,
        csrfToken: number,
        isPeakTime: boolean,
        comment_visibility: number,
        v: string,
        videoId: string,
        deleted: boolean,
        mylist_counter: number,
        mylistcomment_counter: number,
        movie_type: string,
        thumbImage: string,
        videoUserId: number,
        userSex: number,
        userAge: number,
        us: number,
        ad: string,
        iee: number,
        communityPostURL: string,
        isNeedPayment: boolean,
        dicArticleURL: string,
        blogEmbedURL: string,
        uadAdvertiseURL: string,
        category: string,
        categoryGroupKey: string,
        categoryGroup: string,
        isWide: boolean,
        wv_id: string,
        wv_title: string,
        wv_code: string,
        wv_time: number,
        leaf_switch: number,
        appliInstalled: boolean,
        use_getrelateditem: boolean,
        seek_token: string,
        tagHirobaId: number,
        language: string,
        area: string,
        commentLanguage: string,
        isAuthenticationRequired: boolean,
        watchTrackId: string,
        watchPageServerTime: number,
        morningPremium: {
            status: string,
            timing: string,
            from_top: false,
        },
    };
    videoDetail: {
        v: string,
        id: string,
        title: string,
        description: string,
        is_translated: boolean,
        title_original: string,
        description_original: string,
        thumbnail: string,
        postedAt: string,
        length: number,
        viewCount: number,
        mylistCount: number,
        commentCount: number,
        mainCommunityId: number,
        communityId: number,
        channelId: number,
        isDeleted: boolean,
        isMymemory: boolean,
        isMonetized: boolean,
        isR18: boolean,
        is_adult: boolean,
        language: string,
        area: string,
        can_translate: boolean,
        video_translation_info: boolean,
        category: string,
        thread_id: string,
        main_genre: string,
        has_owner_thread?: boolean,
        is_video_owner?: boolean,
        is_uneditable_tag: boolean,
        commons_tree_exists: boolean,
        yesterday_rank?: number,
        highest_rank: number,
        for_bgm: boolean,
        is_nicowari?: boolean,
        is_public: boolean,
        is_official: boolean,
        no_ichiba: boolean,
        dicArticleURL: string,
        tagList: Array<{
            id: number,
            tag: string,
            cat?: boolean,
            dic?: boolean,
            lck?: boolean,
        }>,
        is_thread_owner: boolean,
        width: number,
        height: number,
    };
    uploaderInfo: {
        id: number,
        nickname: string,
        stamp_exp: number,
        icon_url: string,
        is_uservideo_public: boolean,
        is_user_myvideo_public: boolean,
        is_user_openlist_public: boolean,
    };
    viewerInfo: {
        id: number,
        nickname: string,
        isPremium: boolean,
        isPrivileged: boolean,
    },
    tagRelatedMarquee?: any,
    tagRelatedBanner?: any,
    topicalLiveRanking: Array<{
        id: string,
        title: string,
        thumbnail: string,
        point: number,
        is_high: boolean,
        elapsed_time: number,
        community_id: number,
        community_name: string,
    }>;
    playlistToken: string;
}