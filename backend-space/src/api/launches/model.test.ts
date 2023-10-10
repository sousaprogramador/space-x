import { expect, beforeEach, beforeAll, test, afterEach, afterAll, it, describe } from "vitest";
import Launche, { ILaunches } from './model'
import * as dbHandler from "./../../tests/db-handler"

let launche: ILaunches;

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

beforeEach(async () => {
    launche = await Launche.create({
        "fairings": {
            "reused": false,
            "recovery_attempt": false,
            "recovered": false,
            "ships": []
        },
        "links": {
            "patch": {
                "small": "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
                "large": "https://images2.imgbox.com/5b/02/QcxHUb5V_o.png"
            },
            "reddit": {
                "campaign": null,
                "launch": null,
                "media": null,
                "recovery": null
            },
            "flickr": {
                "small": [],
                "original": []
            },
            "presskit": null,
            "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
            "youtube_id": "0a_00nJ_Y88",
            "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
            "wikipedia": "https://en.wikipedia.org/wiki/DemoSat"
        },
        "static_fire_date_utc": "2006-03-17T00:00:00.000Z",
        "static_fire_date_unix": 1142553600,
        "net": false,
        "window": 0,
        "rocket": "5e9d0d95eda69955f709d1eb",
        "success": false,
        "failures": [
            {
                "time": 33,
                "altitude": null,
                "reason": "merlin engine failure"
            }
        ],
        "details": "Engine failure at 33 seconds and loss of vehicle",
        "crew": [],
        "ships": [],
        "capsules": [],
        "payloads": [
            "5eb0e4b5b6c3bb0006eeb1e1"
        ],
        "launchpad": "5e9e4502f5090995de566f86",
        "flight_number": 1,
        "name": "FalconSat",
        "date_utc": "2006-03-24T22:30:00.000Z",
        "date_unix": 1143239400,
        "date_local": "2006-03-25T10:30:00+12:00",
        "date_precision": "hour",
        "upcoming": false,
        "cores": [
            {
                "core": "5e9e289df35918033d3b2623",
                "flight": 1,
                "gridfins": false,
                "legs": false,
                "reused": false,
                "landing_attempt": false,
                "landing_success": null,
                "landing_type": null,
                "landpad": null
            }
        ],
        "auto_update": true,
        "tbd": false,
        "launch_library_id": null,
        "launch_id": "5eb87cd9ffd86e000604b32a"
    })
})

describe('view launches', () => {
    it('returns simple view', () => {
        const view = launche.view();
        expect(typeof view).toBe('object')
        expect(view.id).toBe(launche.id)
        expect(view.name).toBe(launche.name)
        expect(view.fairings).toBe(launche.fairings)
        expect(view.links).toBe(launche.links)
        expect(view.static_fire_date_utc).toBe(launche.static_fire_date_utc)
        expect(view.static_fire_date_unix).toBe(launche.static_fire_date_unix)
        expect(view.net).toBe(launche.net)
        expect(view.window).toBe(launche.window)
        expect(view.rocket).toBe(launche.rocket)
        expect(view.success).toBe(launche.success)
        expect(view.failures).toBe(launche.failures)
        expect(view.details).toBe(launche.details)
        expect(view.crew).toBe(launche.crew)
        expect(view.ships).toBe(launche.ships)
        expect(view.capsules).toBe(launche.capsules)
        expect(view.payloads).toBe(launche.payloads)
        expect(view.launchpad).toBe(launche.launchpad)
        expect(view.flight_number).toBe(launche.flight_number)
        expect(view.date_utc).toBe(launche.date_utc)
        expect(view.date_unix).toBe(launche.date_unix)
        expect(view.date_local).toBe(launche.date_local)
        expect(view.date_precision).toBe(launche.date_precision)
        expect(view.upcoming).toBe(launche.upcoming)
        expect(view.cores).toBe(launche.cores)
        expect(view.auto_update).toBe(launche.auto_update)
        expect(view.tbd).toBe(launche.tbd)
        expect(view.launch_library_id).toBe(launche.launch_library_id)
        expect(view.launch_id).toBe(launche.launch_id)
        expect(view.createdAt).toBeTruthy()
        expect(view.updatedAt).toBeTruthy()
    })

    it('returns full view', () => {
        const view = launche.view(true)
        expect(typeof view).toBe('object')
        expect(view.id).toBe(launche.id)
        expect(view.name).toBe(launche.name)
        expect(view.fairings).toBe(launche.fairings)
        expect(view.links).toBe(launche.links)
        expect(view.static_fire_date_utc).toBe(launche.static_fire_date_utc)
        expect(view.static_fire_date_unix).toBe(launche.static_fire_date_unix)
        expect(view.net).toBe(launche.net)
        expect(view.window).toBe(launche.window)
        expect(view.rocket).toBe(launche.rocket)
        expect(view.success).toBe(launche.success)
        expect(view.failures).toBe(launche.failures)
        expect(view.details).toBe(launche.details)
        expect(view.crew).toBe(launche.crew)
        expect(view.ships).toBe(launche.ships)
        expect(view.capsules).toBe(launche.capsules)
        expect(view.payloads).toBe(launche.payloads)
        expect(view.launchpad).toBe(launche.launchpad)
        expect(view.flight_number).toBe(launche.flight_number)
        expect(view.date_utc).toBe(launche.date_utc)
        expect(view.date_unix).toBe(launche.date_unix)
        expect(view.date_local).toBe(launche.date_local)
        expect(view.date_precision).toBe(launche.date_precision)
        expect(view.upcoming).toBe(launche.upcoming)
        expect(view.cores).toBe(launche.cores)
        expect(view.auto_update).toBe(launche.auto_update)
        expect(view.tbd).toBe(launche.tbd)
        expect(view.launch_library_id).toBe(launche.launch_library_id)
        expect(view.launch_id).toBe(launche.launch_id)
        expect(view.createdAt).toBeTruthy()
        expect(view.updatedAt).toBeTruthy()
    })
})
