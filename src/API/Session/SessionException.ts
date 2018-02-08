import Exception from "../../Model/Common/Exception";

export class SessionException extends Exception {
}

export namespace SessionException {
    export enum Code {
        LOGIN_FAILURE,
    }

    export function ErrorMessage(code: Code): string {
        switch (code) {
            case Code.LOGIN_FAILURE:
                return "Login Failure.";
            default:
                return "Unknown Error.";
        }
    }
}

export default SessionException;
