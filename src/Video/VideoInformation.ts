import { DmcInformation } from "./Dmc/DmcInformation";
import { SmileInformation } from "./SmileInformation";

export interface VideoInformation {
    id: string;
    title: string;
    originalTitle: string;
    description: string;
    originalDescription: string;
    thumbnailURL: string;
    postedDateTime: string; // '2013/03/30 12:09:51'
    originalPostedDateTime?: string;
    width: number;
    height: number;
    duration: number;
    viewCount: number;
    mylistCount: number;
    translation: boolean;
    translator?: any;
    movieType: string; // 'mp4'
    badges?: any;
    introducedNicoliveDJInfo?: any;
    dmcInfo?: DmcInformation;
    backCommentType?: any;
    isCommentExpired: boolean;
    isWide: string; // '1'
    isOfficialAnime?: any; // null, 1 for example
    isNoBanner?: any; // null, '1' for example
    isDeleted: boolean;
    isTranslated: boolean;
    isR18: boolean;
    isAdult: boolean;
    isNicowari?: any;
    isPublic: boolean;
    isPublishedNicoscript?: any;
    isNoNGS?: any;
    isCommunityMemberOnly: string; // ''
    isCommonsTreeExists?: any;
    isNoIchiba: boolean;
    isOfficial: boolean;
    isMonetized: boolean;
    smileInfo: SmileInformation;
}