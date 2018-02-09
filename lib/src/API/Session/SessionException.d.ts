import Exception from "../../Model/Common/Exception";
export declare class SessionException extends Exception {
}
export declare namespace SessionException {
    enum Code {
        LOGIN_FAILURE = 0,
    }
    function ErrorMessage(code: Code): string;
}
export default SessionException;
