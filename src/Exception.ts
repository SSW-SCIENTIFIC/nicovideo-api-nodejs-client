export default class Exception extends Error {
    public constructor(message: string = "", public readonly code: number = 0, public readonly previous: Exception|null = null) {
        super(message);
    }

    public toString(): string {
        return this.code + ": " + this.message;
    }
}