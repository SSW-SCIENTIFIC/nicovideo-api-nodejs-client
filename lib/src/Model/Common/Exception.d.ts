export declare class Exception extends Error {
    readonly code: number;
    readonly previous: Exception | null;
    /**
     * Exception constructor.
     * @param {string} message
     * @param {number} code
     * @param {Exception|null} previous
     */
    constructor(message?: string, code?: number, previous?: Exception | null);
    toString(): string;
}
export default Exception;
