import { expect, beforeEach, beforeAll, afterEach, afterAll, it, describe } from "vitest";
import Notification, { INotification } from './model'
import * as dbHandler from "./../../tests/db-handler"
import { createNotification, deleteNotification } from "./controllers";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase())

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());


let message: INotification;

beforeEach(async () => {
    message = await Notification.create({ message: "teste", status: "success" })
})

describe('Test for the  deleteNotification', () => {
    it('Must delete all notifications from the collection', async () => {
        const notification = { message: "teste", status: "success" }
        const notification1 = new Notification(notification);
        const notification2 = new Notification(notification);

        await notification1.save();
        await notification2.save();

        await deleteNotification();

        const notifications = await Notification.find({});
        expect(notifications.length).toBe(0);
    });
});

describe('Test for the createNotification function', () => {
    it('Should create a notification with success status', async () => {
        const status = "success";
        const notification = await createNotification(status);

        expect(notification).toBeDefined();
        expect(notification.status).toBe(status);
    });

    it('Should create a notification with failure status', async () => {
        const status = "failure";
        const notification = await createNotification(status);

        expect(notification).toBeDefined();
        expect(notification.status).toBe(status);
    });
});
