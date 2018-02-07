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
var QueryString = require("querystring");
var xml_js_1 = require("xml-js");
var cheerio = require("cheerio");
var APIEntryPoints_1 = require("../APIEntryPoints");
/**
 * Access nicovideo.jp Level API Directly.
 */
var Video = (function () {
    /**
     * @constructor
     * @param {Session} session
     */
    function Video(session) {
        this.session = session;
        this.getComment = this.getCommentByJson;
        // do nothing
    }
    /**
     * Access getthhumbinfo API and get parsed object.
     * @param {string} videoId
     * @returns {Promise<string>}
     */
    Video.prototype.getThumbInfo = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = xml_js_1.xml2js;
                        return [4 /*yield*/, this.session.client.request(APIEntryPoints_1.Video.createGetThumbInfoRequest(videoId))];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).data,
                            { compact: true }])];
                }
            });
        });
    };
    /**
     * Access getflv API and get parsed object.
     * @param videoId
     * @returns {Promise<string>}
     */
    Video.prototype.getFlv = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = QueryString).parse;
                        return [4 /*yield*/, this.session.client.request(APIEntryPoints_1.Video.createGetFlvRequest(videoId))];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).data])];
                }
            });
        });
    };
    /**
     * Access watch API and get response body.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<string>}
     */
    Video.prototype.getWatchPage = function (videoId, isHTML5) {
        if (isHTML5 === void 0) { isHTML5 = true; }
        return __awaiter(this, void 0, void 0, function () {
            var options, cookies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = APIEntryPoints_1.Video.createWatchRequest(videoId);
                        options.headers = options.headers || {};
                        cookies = ([options.headers.Cookie] || []);
                        cookies.push("watch_html5=" + (isHTML5 ? 1 : 0), "watch_flash=" + (isHTML5 ? 0 : 1));
                        options.headers.Cookie = cookies.join("; ");
                        return [4 /*yield*/, this.session.client.request(options)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Get watch API data.
     * @param {string} videoId
     * @param {boolean} isHTML5 true if you want to access html5 version page. Default value is true.
     * @returns {Promise<WatchData>}
     */
    Video.prototype.getWatchData = function (videoId, isHTML5) {
        if (isHTML5 === void 0) { isHTML5 = true; }
        return __awaiter(this, void 0, void 0, function () {
            var dom, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = cheerio).load;
                        return [4 /*yield*/, this.getWatchPage(videoId, isHTML5)];
                    case 1:
                        dom = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, isHTML5 ?
                                JSON.parse(dom("#js-initial-watch-data").attr("data-api-data") || "{}") :
                                JSON.parse(dom("#watchAPIDataContainer").text() || "{}")];
                }
            });
        });
    };
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSession} session
     * @returns {Promise<DmcSessionResult>}
     */
    Video.prototype.createDmcSession = function (videoId, apiUrl, session) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.client.request(APIEntryPoints_1.Video.createDmcSessionRequest(videoId, apiUrl, session))];
                    case 1: return [2 /*return*/, (_a.sent()).data.data.session];
                }
            });
        });
    };
    /**
     *
     * @param {string} videoId
     * @param {string} apiUrl
     * @param {DmcSessionResult} session
     * @returns {Promise<DmcSessionResult>}
     */
    Video.prototype.sendDmcHeartbeat = function (videoId, apiUrl, session) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.client.request(APIEntryPoints_1.Video.createDmcHeartbeatRequest(videoId, apiUrl, session))];
                    case 1: return [2 /*return*/, (_a.sent()).data.data.session];
                }
            });
        });
    };
    Video.prototype.getThreadKey = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = QueryString).parse;
                        return [4 /*yield*/, this.session.client.request(APIEntryPoints_1.Video.createGetThreadKeyRequest(threadId))];
                    case 1:
                        result = _b.apply(_a, [(_c.sent()).data]);
                        return [2 /*return*/, { key: result.threadkey, force_184: result.force_184 == 1 }];
                }
            });
        });
    };
    Video.prototype.getCommentByJson = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.client.request(APIEntryPoints_1.Video.createGetCommentByJsonRequest(request))];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    Video.prototype.getCommentByXML = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.session.client.request(APIEntryPoints_1.Video.createGetCommentByXMLRequest(body))];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    Video.prototype.getWaybackKey = function (threadId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = QueryString).parse;
                        return [4 /*yield*/, this.session.client.request(APIEntryPoints_1.Video.createGetWaybackKeyRequest(threadId))];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).data]).waybackkey];
                }
            });
        });
    };
    return Video;
}());
exports.Video = Video;
