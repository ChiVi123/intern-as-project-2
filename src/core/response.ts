export class ResponseRepo<T> {
    public success = true;
    public message: string;
    public data: T | undefined;

    constructor(message: string, data?: T) {
        this.message = message;
        this.data = data;
    }
}
export class ResponseErrorRepo extends Error {
    public success = true;
    public message: string;
    public error: unknown;

    constructor(message: string, error: unknown) {
        super(message);
        this.message = message;
        this.error = error;
    }
}
