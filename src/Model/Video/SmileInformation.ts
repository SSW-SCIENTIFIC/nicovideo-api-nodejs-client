export interface SmileInformation {
    url: string;
    isSlowLine: boolean;
    currentQualityId: string; // 'auto'
    qualityIds: Array<string>; // ['auto', 'low']
}
