import axios from "axios";

import { Ranking as API } from "../APIEntryPoints";

export class Ranking {
    public constructor() {
        // do nothing
    }

    public async getRankingRSS(period: string, type: string, suffix: string): Promise<string> {
        return (await axios.request(API.createGetRankingRSSRequest(period, type, suffix))).data;
    }
}