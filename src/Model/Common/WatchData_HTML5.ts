import { PlaylistItem } from "../Video/PlaylistItem";
import { Tag } from "../Video/Tag";
import { ThreadInformation } from "../Video/ThreadInformation";
import { VideoInformation } from "../Video/VideoInformation";

export { PlaylistItem } from "../Video/PlaylistItem";
export { Tag } from "../Video/Tag";
export { ThreadInformation } from "../Video/ThreadInformation";
export { VideoInformation } from "../Video/VideoInformation";

export interface WatchData_HTML5 {
    video: VideoInformation;
    player?: {
        playerInfoXMLUpdateTime: number,
        isContinuous: boolean,
    };
    thread: ThreadInformation;
    tags: Array<Tag>;
    playlist: {
        items: Array<PlaylistItem>,
        type: string, // 'recommend'
        ref: string, // 'other'
        option: Array<any>, // []
    };
    owner?: {
        id: string, // '2047738'
        nickname: string,
        stampExp: string, // '271'
        iconURL: string,
        nicoliveInfo?: any,
        channelInfo?: any,
        isUserVideoPublic: boolean,
        isUserMyVideoPublic: boolean,
        isUserOpenListPublic: boolean,
    };
    viewer: {
        id: number,
        nickname: string,
        prefecture: number, // 20
        sex: number, // 0
        age: number, // 35
        isPremium: boolean,
        isPrivileged: boolean,
        isPostLocked: boolean,
        isHtrzm: boolean,
        isTwitterConnection: boolean,
    };
    community?: {
        id: number,
        mainId: number,
        name: string,
        threadType: string, // '1'
        globalId: string,
    };
    channel?: {
        id: string, // '2630573'
        name: string,
        iconURL: string,
        favoriteToken: string,
        favoriteTokenTime: number,
        isFavorited: boolean,
        ngList: Array<{
            source: string, // ''
            destination: string, // ''
        }>,
        threadType: string, // '1'
        globalId: string,
    };
    ad?: {
        vastMetaData?: any,
    };
    lead: {
        tagRelatedMarquee?: {
            id: string, // '1269'
            url: string,
            title: string,
        },
        tagRelatedBanner?: any,
        nicosdkApplicationBanner?: any,
        videoEndBannerIn?: any,
        videoEndOverlay?: any
    };
    maintenance?: any;
    context: {
        playFrom?: any,
        initialPlaybackPosition?: any,
        initialPlaybackType?: any,
        playLength?: any,
        returnId?: any,
        returnTo?: any,
        returnMsg?: any,
        watchId: string,
        isNoMovie?: any,
        isNoRelatedVideo?: any,
        isDownloadCompleteWait?: any,
        isNoNicotic?: any,
        isNeedPayment: boolean,
        isAdultRatingNG: boolean,
        isPlayable?: boolean,
        isTranslatable: boolean,
        isTagUneditable: boolean,
        isVideoOwner: boolean,
        isThreadOwner: boolean,
        isOwnerThreadEditable?: any,
        useChecklistCache?: any,
        isDisabledMarquee?: any,
        isDictionaryDisplayable: boolean,
        isDefaultCommentInvisible: boolean,
        accessFrom?: any,
        csrfToken: string,
        translationVersionJsonUpdateTime: number,
        userkey: string,
        watchAuthKey: string,
        watchTrackId: string,
        watchPageServerTime: number,
        isAuthenticationRequired: boolean,
        isPeakTime?: any,
        ngRevision: number,
        categoryName: string,
        categoryKey: string, // 'game'
        categoryGroupName: string,
        categoryGroupKey: string, // 'g_culture2'
        yesterdayRank?: any,
        highestRank: number,
        isMyMemory: boolean,
        ownerNGList: Array<{ // [{ source: '', destination: '' }]
            source: string,
            destination: string,
        }>,
    };
    liveTopics: {
        items: Array<{
            id: string,
            title: string,
            thumbnailURL: string,
            point: number,
            isHigh: boolean,
            elapsedTimeM: number,
            communityId: string,
            communityName: string,
        }>,
    };
}

