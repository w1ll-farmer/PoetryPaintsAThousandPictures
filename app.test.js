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
});
