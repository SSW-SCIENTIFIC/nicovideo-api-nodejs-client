export class Exception extends Error {
    /**
     * Exception constructor.
     * @param {string} message
     * @param {number} code
     * @param {Exception|null} previous
     */
    public constructor(message: string = "", public readonly code: number = 0, public readonly previous: Exception|null = null) {
        super(message);
    }

    public toString(): string {
        return this.code + ": " + this.message;
    }
}

export default Exception;
