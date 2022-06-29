export default class ApiError {
    private message: String;

    constructor(err: unknown) {
        if (err instanceof Error) {
            this.message = err.message;
        } else if (typeof err === "string") {
            this.message = err;
        } else {
            this.message = "Unknown error";
        }
    }
}