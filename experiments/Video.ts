import * as fs from "fs-extra";
import * as util from "util";
import * as qs from "querystring";

import { Session } from "../src/Session/Session";
import { Video } from "../src/Video/Video";
import { email, password } from "../privates";
import { WatchAPIData } from "../src/Video/WatchAPIData";
import * as Request from "request";
import * as RequestPromise from "request-promise";
import {LowLevel} from "../src/Video/VideoLow";
import {gzip} from "zlib";

console.log("Video Experiments");


(async () => {
    try {
        const session: Session = new Session();
        await session.login(email, password);

        const video: Video = new Video(session);
        const videoLow: LowLevel.Video = new LowLevel.Video(session);
        const watchData: WatchAPIData = await video.getWatchData("so31003585");

        console.log(util.inspect(watchData, {depth: 100}));
    } catch (err) {
        console.log("error");
        console.log(util.inspect(err, {depth: 100}));
    }
})();