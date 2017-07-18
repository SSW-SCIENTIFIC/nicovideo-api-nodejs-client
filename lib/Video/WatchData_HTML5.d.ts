import { PlaylistItem } from "./PlaylistItem";
import { Tag } from "./Tag";
import { ThreadInformation } from "./ThreadInformation";
import { VideoInformation } from "./VideoInformation";
export { PlaylistItem } from "./PlaylistItem";
export { Tag } from "./Tag";
export { ThreadInformation } from "./ThreadInformation";
export { VideoInformation } from "./VideoInformation";
export interface WatchData_HTML5 {
    video: VideoInformation;
    player?: {
        playerInfoXMLUpdateTime: number;
        isContinuous: boolean;
    };
    thread: ThreadInformation;
    tags: Array<Tag>;
    playlist: {
        items: Array<PlaylistItem>;
        type: string;
        ref: string;
        option: Array<any>;
    };
    owner?: {
        id: string;
        nickname: string;
        stampExp: string;
        iconURL: string;
        nicoliveInfo?: any;
        channelInfo?: any;
        isUserVideoPublic: boolean;
        isUserMyVideoPublic: boolean;
        isUserOpenListPublic: boolean;
    };
    viewer: {
        id: number;
        nickname: string;
        prefecture: number;
        sex: number;
        age: number;
        isPremium: boolean;
        isPrivileged: boolean;
        isPostLocked: boolean;
        isHtrzm: boolean;
        isTwitterConnection: boolean;
    };
    community?: {
        id: number;
        mainId: number;
        name: string;
        threadType: string;
        globalId: string;
    };
    channel?: {
        id: string;
        name: string;
        iconURL: string;
        favoriteToken: string;
        favoriteTokenTime: number;
        isFavorited: boolean;
        ngList: Array<{
            source: string;
            destination: string;
        }>;
        threadType: string;
        globalId: string;
    };
    ad?: {
        vastMetaData?: any;
    };
    lead: {
        tagRelatedMarquee?: {
            id: string;
            url: string;
            title: string;
        };
        tagRelatedBanner?: any;
        nicosdkApplicationBanner?: any;
        videoEndBannerIn?: any;
        videoEndOverlay?: any;
    };
    maintenance?: any;
    context: {
        playFrom?: any;
        initialPlaybackPosition?: any;
        initialPlaybackType?: any;
        playLength?: any;
        returnId?: any;
        returnTo?: any;
        returnMsg?: any;
        watchId: string;
        isNoMovie?: any;
        isNoRelatedVideo?: any;
        isDownloadCompleteWait?: any;
        isNoNicotic?: any;
        isNeedPayment: boolean;
        isAdultRatingNG: boolean;
        isPlayable?: boolean;
        isTranslatable: boolean;
        isTagUneditable: boolean;
        isVideoOwner: boolean;
        isThreadOwner: boolean;
        isOwnerThreadEditable?: any;
        useChecklistCache?: any;
        isDisabledMarquee?: any;
        isDictionaryDisplayable: boolean;
        isDefaultCommentInvisible: boolean;
        accessFrom?: any;
        csrfToken: string;
        translationVersionJsonUpdateTime: number;
        userkey: string;
        watchAuthKey: string;
        watchTrackId: string;
        watchPageServerTime: number;
        isAuthenticationRequired: boolean;
        isPeakTime?: any;
        ngRevision: number;
        categoryName: string;
        categoryKey: string;
        categoryGroupName: string;
        categoryGroupKey: string;
        yesterdayRank?: any;
        highestRank: number;
        isMyMemory: boolean;
        ownerNGList: Array<{
            source: string;
            destination: string;
        }>;
    };
    liveTopics: {
        items: Array<{
            id: string;
            title: string;
            thumbnailURL: string;
            point: number;
            isHigh: boolean;
            elapsedTimeM: number;
            communityId: string;
            communityName: string;
        }>;
    };
}
