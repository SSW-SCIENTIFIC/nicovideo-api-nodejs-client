"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Period;
(function (Period) {
    Period["HOURLY"] = "hourly";
    Period["DAILY"] = "daily";
    Period["WEEKLY"] = "weekly";
    Period["MONTHLY"] = "monthly";
    Period["ALL"] = "all";
})(Period = exports.Period || (exports.Period = {}));
var Type;
(function (Type) {
    Type["TOTAL"] = "fav";
    Type["VIEW"] = "view";
    Type["COMMENT"] = "res";
    Type["MYLIST"] = "mylist";
})(Type = exports.Type || (exports.Type = {}));
exports.CategoryList = [
    {
        title: "カテゴリ合算",
        suffix: "all"
    },
    {
        title: "エンタメ・音楽",
        suffix: "g_ent2",
        children: [
            {
                title: "エンターテイメント",
                suffix: "ent"
            },
            {
                title: "音楽",
                suffix: "music"
            },
            {
                title: "歌ってみた",
                suffix: "sing"
            },
            {
                title: "演奏してみた",
                suffix: "play"
            },
            {
                title: "踊ってみた",
                suffix: "dance"
            },
            {
                title: "VOCALOID",
                suffix: "vocaloid"
            },
            {
                title: "ニコニコインディーズ",
                suffix: "nicoindies"
            },
        ]
    },
    {
        title: "生活・一般・スポ",
        suffix: "g_life2",
        children: [
            {
                title: "動物",
                suffix: "animal"
            },
            {
                title: "料理",
                suffix: "cooking"
            },
            {
                title: "自然",
                suffix: "nature"
            },
            {
                title: "旅行",
                suffix: "travel"
            },
            {
                title: "スポーツ",
                suffix: "sport"
            },
            {
                title: "ニコニコ動画講座",
                suffix: "lecture"
            },
            {
                title: "車載動画",
                suffix: "drive"
            },
            {
                title: "歴史",
                suffix: "history"
            },
        ],
    },
    {
        title: "政治",
        suffix: "g_politics"
    },
    {
        title: "科学・技術",
        suffix: "g_tech",
        children: [
            {
                title: "科学",
                suffix: "science"
            },
            {
                title: "ニコニコ技術部",
                suffix: "tech"
            },
            {
                title: "ニコニコ手芸部",
                suffix: "handcraft"
            },
            {
                title: "作ってみた",
                suffix: "make"
            },
        ],
    },
    {
        title: "アニメ・ゲーム・絵",
        suffix: "g_culture2",
        children: [
            {
                title: "アニメ",
                suffix: "anime"
            },
            {
                title: "ゲーム",
                suffix: "game"
            },
            {
                title: "東方",
                suffix: "toho"
            },
            {
                title: "アイドルマスター",
                suffix: "imas"
            },
            {
                title: "ラジオ",
                suffix: "radio"
            },
            {
                title: "描いてみた",
                suffix: "draw"
            },
        ],
    },
    {
        title: "その他",
        suffix: "g_other",
        children: [
            {
                title: "例のアレ",
                suffix: "are"
            },
            {
                title: "日記",
                suffix: "diary"
            },
            {
                title: "その他",
                suffix: "other"
            },
        ],
    },
];
//# sourceMappingURL=CategoryList.js.map