export default class Exception extends Error {
    readonly code: number;
    readonly previous: Exception | null;
    constructor(message?: string, code?: number, previous?: Exception | null);
    toString(): string;
}
