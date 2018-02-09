export declare enum Period {
    HOURLY = "hourly",
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    ALL = "all",
}
export declare enum Type {
    TOTAL = "fav",
    VIEW = "view",
    COMMENT = "res",
    MYLIST = "mylist",
}
export interface Category {
    title: string;
    suffix: string;
    children?: Array<Category>;
}
export declare const CategoryList: Array<Category>;
