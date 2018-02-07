"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DmcSessionUtility_1 = require("./Utility/DmcSessionUtility");
var VideoLow = require("./LowLevel");
var APIEntryPoints_1 = require("../APIEntryPoints");
var Exception_1 = require("../Exception");
var Video = (function () {
    /**
     * @constructor
     * @param {Session} session
     */
    function Video(session) {
        this.session = session;
        this.lowLevel = new VideoLow.Video(session);
    }
    /**
     * Get WatchData from watch API.
     * @param {string} videoId
     * @returns {Promise<WatchData>}
     */
    Video.prototype.getWatchData = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lowLevel.getWatchData(videoId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Video.prototype.getVideoFromSmile = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var videoInfo, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof param == "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getWatchData(param)];
                    case 1:
                        videoInfo = (_a.sent()).video;
                        return [3 /*break*/, 4];
                    case 2:
                        videoInfo = param.video;
                        return [4 /*yield*/, this.lowLevel.getWatchPage(videoInfo.id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        options = APIEntryPoints_1.Video.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url);
                        return [4 /*yield*/, this.session.client.request(options)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Video.prototype.getVideoStreamFromSmile = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var videoInfo, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof param === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getWatchData(param)];
                    case 1:
                        videoInfo = (_a.sent()).video;
                        return [3 /*break*/, 4];
                    case 2:
                        videoInfo = param.video;
                        return [4 /*yield*/, this.lowLevel.getWatchPage(videoInfo.id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        options = APIEntryPoints_1.Video.createDownloadFromSmileRequest(videoInfo.id, videoInfo.smileInfo.url);
                        options.responseType = "stream";
                        return [4 /*yield*/, this.session.client.request(options)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create Session for DMC Server.
     * @param {WatchData} watchAPIData
     * @returns {Promise<DmcSessionResult>}
     */
    Video.prototype.createDmcSession = function (watchAPIData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!watchAPIData.video.dmcInfo) {
                            throw new Exception_1.default();
                        }
                        return [4 /*yield*/, this.lowLevel.createDmcSession(watchAPIData.video.id, watchAPIData.video.dmcInfo.session_api.urls[0].url, DmcSessionUtility_1.DmcSessionUtility.createSessionFromWatchAPIData(watchAPIData))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Video.prototype.getVideoFromDmc = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var watchAPIData, session, id, apiUrl, options, intervalId, fin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof param === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getWatchData(param)];
                    case 1:
                        watchAPIData = (_a.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        watchAPIData = param;
                        _a.label = 3;
                    case 3:
                        if (!watchAPIData.video.dmcInfo) {
                            throw new Exception_1.default();
                        }
                        return [4 /*yield*/, this.createDmcSession(watchAPIData)];
                    case 4:
                        session = _a.sent();
                        id = watchAPIData.video.id;
                        apiUrl = watchAPIData.video.dmcInfo.session_api.urls[0].url;
                        options = APIEntryPoints_1.Video.createDownloadFromDmcRequest(id, session.content_uri);
                        intervalId = setInterval(function () {
                            console.log("beating...");
                            return _this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
                        }, session.keep_method.heartbeat.lifetime * 0.9);
                        fin = function (arg) {
                            clearInterval(intervalId);
                            return arg;
                        };
                        return [4 /*yield*/, this.session.client.request(options).then(fin).catch(fin)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Video.prototype.getVideoStreamFromDmc = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var watchAPIData, session, id, apiUrl, options, intervalId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof param === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getWatchData(param)];
                    case 1:
                        watchAPIData = (_a.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        watchAPIData = param;
                        _a.label = 3;
                    case 3:
                        if (!watchAPIData.video.dmcInfo) {
                            throw new Exception_1.default();
                        }
                        return [4 /*yield*/, this.createDmcSession(watchAPIData)];
                    case 4:
                        session = _a.sent();
                        id = watchAPIData.video.id;
                        apiUrl = watchAPIData.video.dmcInfo.session_api.urls[0].url;
                        options = APIEntryPoints_1.Video.createDownloadFromDmcRequest(watchAPIData.video.id, session.content_uri);
                        options.responseType = "stream";
                        intervalId = setInterval(function () {
                            console.log("beating...");
                            return _this.lowLevel.sendDmcHeartbeat(id, apiUrl, session);
                        }, session.keep_method.heartbeat.lifetime * 0.9);
                        return [4 /*yield*/, this.session.client.request(options)];
                    case 5:
                        result = _a.sent();
                        result.data
                            .on("close", function () { return clearInterval(intervalId); })
                            .on("end", function () { return clearInterval(intervalId); })
                            .on("error", function () { return clearInterval(intervalId); });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     *
     * @param videoId
     * @returns {Promise<void>}
     * @todo implement
     */
    Video.prototype.getVideo = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Video.prototype.getVideoStream = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Video.prototype.getComment = function (watchData) {
        return __awaiter(this, void 0, void 0, function () {
            var keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!watchData.video.isOfficial) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getThreadKey(watchData)];
                    case 1:
                        keys = _a.sent();
                        return [3 /*break*/, 2];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Video.prototype.getThreadKey = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var threadId;
            return __generator(this, function (_a) {
                if (typeof param === "number") {
                    threadId = param;
                }
                else {
                    threadId = param.thread.ids.nicos || param.thread.ids.community || param.thread.ids.default;
                }
                return [2 /*return*/, this.lowLevel.getThreadKey(threadId)];
            });
        });
    };
    return Video;
}());
exports.Video = Video;
