import Notification, { NotificationErrorProps } from "./notification";

describe('Unit tests for notification', () => {
    it("should create errors", () => {
        const notification = new Notification();

        const errorOne: NotificationErrorProps = {
            context: "customer",
            message: "error message one"
        };
        notification.addError(errorOne);
        expect(notification.messages("customer")).toBe("customer: error message one");

        const errorTwo: NotificationErrorProps = {
            context: "customer",
            message: "error message two"
        };
        notification.addError(errorTwo);
        expect(notification.messages("customer")).toBe("customer: error message one, customer: error message two");
    });

    it("should filter errors by context", () => {
        const notification = new Notification();

        const errorOne: NotificationErrorProps = {
            context: "customer",
            message: "error message one"
        };
        notification.addError(errorOne);

        const errorTwo: NotificationErrorProps = {
            context: "order",
            message: "error message two"
        };
        notification.addError(errorTwo);

        expect(notification.messages("customer")).toBe("customer: error message one");
        expect(notification.messages("order")).toBe("order: error message two");
    });

    it("should show all errors", () => {
        const notification = new Notification();

        const errorOne: NotificationErrorProps = {
            context: "customer",
            message: "error message one"
        };
        notification.addError(errorOne);

        const errorTwo: NotificationErrorProps = {
            context: "order",
            message: "error message two"
        };
        notification.addError(errorTwo);

        expect(notification.messages()).toBe("customer: error message one, order: error message two");
        expect(notification.messages("")).toBe("customer: error message one, order: error message two");
    });

    it("should has errors", () => {
        const notification = new Notification();

        const error: NotificationErrorProps = {
            context: "customer",
            message: "error message one"
        };
        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });

    it("should not has errors", () => {
        const notification = new Notification();

        expect(notification.hasErrors()).toBe(false);
    });

    it("should get all errors props", () => {
        const notification = new Notification();

        const errorOne: NotificationErrorProps = {
            context: "customer",
            message: "error message one"
        };
        notification.addError(errorOne);

        const errorTwo: NotificationErrorProps = {
            context: "order",
            message: "error message two"
        };
        notification.addError(errorTwo);

        expect(notification.getErrors()).toEqual([errorOne, errorTwo]);
    });

});