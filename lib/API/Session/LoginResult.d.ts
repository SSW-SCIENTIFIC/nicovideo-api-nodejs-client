export declare enum LoginResultStatus {
    FAILURE = -1,
    SUCCESS = 0,
    MULTI_FACTOR = 1,
}
export interface LoginResult {
    status: LoginResultStatus;
    url?: string;
}
