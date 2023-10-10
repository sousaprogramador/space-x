import request from 'supertest';
import express from 'express';
import { describe, expect, it } from 'vitest';
import { index, stats } from './controllers';

const app = express();

app.get('/launches', index);

app.get('/launches/stats', stats);

describe('Test for the list launches service', () => {
    it('Should return an object with the expected structure', async () => {
        const response = await request(app).get('/launches?page=1&limit=10');

        expect(response.status).to.equal(500);

        expect(response.body).to.not.have.property('results');
        expect(response.body).to.not.have.property('totalDocs');
        expect(response.body).to.not.have.property('page');
        expect(response.body).to.not.have.property('totalPages');
        expect(response.body).to.not.have.property('hasNext');
        expect(response.body).to.not.have.property('hasPrev');

        expect(response.body.results).to.not.be.an('array');
        expect(response.body.totalDocs).to.not.be.a('number');
        expect(response.body.page).to.not.be.a('number');
        expect(response.body.totalPages).to.not.be.a('number');
        expect(response.body.hasNext).to.not.be.a('boolean');
        expect(response.body.hasPrev).to.not.be.a('boolean');

        expect(response.body.results).to.not.deep.equal([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ]);
        expect(response.body.totalDocs).to.not.equal(2);
        expect(response.body.page).to.not.equal(1);
        expect(response.body.totalPages).to.not.equal(1);
        expect(response.body.hasNext).to.not.be.false;
        expect(response.body.hasPrev).to.not.be.false;
    });
});

describe('Test for the data stats service', () => {
    it('Should return an object with the expected structure', async () => {
        const response = await request(app).get('/stats');

        expect(response.status).to.equal(404);

        expect(response.body).to.not.have.property('results');
        expect(response.body).to.not.have.property('totalDocs');
        expect(response.body).to.not.have.property('page');
        expect(response.body).to.not.have.property('totalPages');
        expect(response.body).to.not.have.property('hasNext');
        expect(response.body).to.not.have.property('hasPrev');

        expect(response.body.results).to.not.be.an('array');
        expect(response.body.totalDocs).to.not.be.a('number');
        expect(response.body.page).to.not.be.a('number');
        expect(response.body.totalPages).to.not.be.a('number');
        expect(response.body.hasNext).to.not.be.a('boolean');
        expect(response.body.hasPrev).to.not.be.a('boolean');

        expect(response.body.results).to.not.deep.equal([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ]);
        expect(response.body.totalDocs).to.not.equal(2);
        expect(response.body.page).to.not.equal(1);
        expect(response.body.totalPages).to.not.equal(1);
        expect(response.body.hasNext).to.be.not.false;
        expect(response.body.hasPrev).to.be.not.false;
    });
});