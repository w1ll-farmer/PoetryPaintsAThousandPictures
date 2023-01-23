/* eslint-disable no-undef */

'use strict';

const request = require('supertest');
const app = require('./app.js');

// eslint-disable-next-line no-undef
describe('Test the poems service', () => {
    // eslint-disable-next-line no-undef
    test('GET /poems succeeds', () => {
        return request(app)
        .get('/poems')
        .expect(200);
    });
    test('GET /poems returns JSON', () => {
        return request(app)
        .get('/poems')
        .expect('Content-type', /json/);
    });
    test('GET /poems includes "Her"', () => {
        return request(app)
        .get('/poems')
        .expect(/Her/);
    });
});
describe('Test reading authors and poems', () => {
    test('POST /save-json', () => {
        const jsonData = { author: 'Michele Meleen', title: 'Behold my Breath', poem: "In and out,\nfast or slow,\nI feel my breath,\nbut can't see it go\nWhen winter arrives\nmy breath comes alive\nIn and out,\nfast or slow,\nin the cold winter air,\nmy breath is there to behold." };
        return request(app)
        .post('/save-json')
        .send(jsonData)
        .expect(200);
        });
});
describe('Test the authors service', () => {
    test('GET /authors succeeds', () => {
        return request(app)
        .get('/authors')
        .expect(200);
    });
    test('/GET authors includes Will Farmer', () => {
        return request(app)
        .get('/authors')
        .expect(/Will Farmer/);
    });
    test('/GET authors returns JSON', () => {
        return request(app)
        .get('/authors')
        .expect('Content-type', /json/);
    });
});
