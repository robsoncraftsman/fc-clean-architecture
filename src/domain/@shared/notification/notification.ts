export type NotificationErrorProps = {
    context: string;
    message: string;
};

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    getErrors() {
        return this.errors;
    }

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    messages(context?: string) {
        return this.errors
            .filter((error) => (!context || error.context === context))
            .map((error) => `${error.context}: ${error.message}`)
            .join(", ");
    }

    hasErrors() {
        return this.errors.length > 0;
    }
}