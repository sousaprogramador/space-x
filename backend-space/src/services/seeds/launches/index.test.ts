import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getLauches, getOptions, getTotalDocs, saveLaunches } from "./";
import { lauchesCountDocuments, lauchesInsertMany } from "../../../api/launches/controllers";

describe('Tests for getTotalDocs', () => {
    let mockAxios: any;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    it('Should return the totalDocs from the API response', async () => {
        const responseData = { data: { totalDocs: 205 } };

        mockAxios.onPost('/launches/query', { options: { limit: 10 } }).reply(200, responseData);

        const result = await getTotalDocs();
        expect(result).to.equal(responseData.data.totalDocs);
    });

    it('Should handle API errors gracefully', async () => {
        mockAxios.onPost('/launches/query', { options: { limit: 10 } }).reply(500);

        try {
            await getTotalDocs();
        } catch (error: any) {
            expect(error.message).to.equal('Request failed with status code 500');
        }
    });
});

describe('Test for the getOptions function', () => {
    it('Should return an object with the expected structure', () => {
        // Define the total value for testing
        const total = 10;

        // Call the getOptions function with the total value
        const options = getOptions(total);

        // Verify if the returned object has the expected structure
        expect(options).toEqual({
            options: {
                populate: ['rocket'],
                limit: total,
            },
        });
    });
});


describe('Test for the getLauches function', () => {
    it('Should return an array of launches', async () => {
        const launches = await getLauches();

        expect(Array.isArray(launches)).to.be.true;
    });
});
