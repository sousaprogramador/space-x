import { expect, beforeEach, beforeAll, test, afterEach, afterAll, it, describe } from "vitest";
import Notification, { INotification } from './model'
import * as dbHandler from "./../../tests/db-handler"

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

describe('view launches', () => {
    it('returns simple view', () => {
        const view = message.view();
        const msg = typeof message.message === 'string';
        expect(typeof view).toBe('object')
        expect(view.id).toBe(message.id)
        expect(msg).toBe(true)
        expect(view.status).toBe(message.status)
        expect(view.createdAt).toBeTruthy()
        expect(view.updatedAt).toBeTruthy()
    })

    it('returns full view', () => {
        const view = message.view(true)
        const msg = typeof message.message === 'string';
        expect(typeof view).toBe('object')
        expect(view.id).toBe(message.id)
        expect(msg).toBe(true)
        expect(view.status).toBe(message.status)
        expect(view.createdAt).toBeTruthy()
        expect(view.updatedAt).toBeTruthy()
    })
})