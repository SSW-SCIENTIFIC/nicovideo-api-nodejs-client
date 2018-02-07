export interface Chat {
    thread: number;
    no: number;
    vpos: number;
    leaf: number;
    date: number;
    date_usec: number;
    anonymity: boolean;
    user_id: string;
    mail: string;
    content: string;
}
