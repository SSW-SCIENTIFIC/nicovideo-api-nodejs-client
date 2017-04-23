import * as SessionAPI from "./src/Session/Session";
import * as VideoAPI from "./src/Video/Video";

declare namespace NicoVideoAPI {
    export type Session = SessionAPI.Session;
    export type Video = VideoAPI.Video;
}

export default NicoVideoAPI;
