export interface ThreadInformation {
    commentCount: number;
    hasOwnerThread?: any;
    mymemoryLanguage?: any;
    serverUrl: string;
    subServerUrl: string;
    ids: {
        default: number;
        nicos?: number;
        community?: number;
    };
}
