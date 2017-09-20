"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const APIEntryPoints_1 = require("../APIEntryPoints");
class Ranking {
    constructor() {
        // do nothing
    }
    async getRankingRSS(period, type, suffix) {
        return (await axios_1.default.request(APIEntryPoints_1.Ranking.createGetRankingRSSRequest(period, type, suffix))).data;
    }
}
exports.Ranking = Ranking;
//# sourceMappingURL=LowLevel.js.map