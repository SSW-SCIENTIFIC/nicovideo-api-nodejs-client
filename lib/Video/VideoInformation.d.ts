import { DmcInformation } from "./DmcInformation";
import { SmileInformation } from "./SmileInformation";
export interface VideoInformation {
    id: string;
    title: string;
    originalTitle: string;
    description: string;
    originalDescription: string;
    thumbnailURL: string;
    postedDateTime: string;
    originalPostedDateTime?: string;
    width: number;
    height: number;
    duration: number;
    viewCount: number;
    mylistCount: number;
    translation: boolean;
    translator?: any;
    movieType: string;
    badges?: any;
    introducedNicoliveDJInfo?: any;
    dmcInfo?: DmcInformation;
    backCommentType?: any;
    isCommentExpired: boolean;
    isWide: string;
    isOfficialAnime?: any;
    isNoBanner?: any;
    isDeleted: boolean;
    isTranslated: boolean;
    isR18: boolean;
    isAdult: boolean;
    isNicowari?: any;
    isPublic: boolean;
    isPublishedNicoscript?: any;
    isNoNGS?: any;
    isCommunityMemberOnly: string;
    isCommonsTreeExists?: any;
    isNoIchiba: boolean;
    isOfficial: boolean;
    isMonetized: boolean;
    smileInfo: SmileInformation;
}
