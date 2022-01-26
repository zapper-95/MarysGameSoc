/* eslint-disable no-undef */
'use strict';
const request = require('supertest');
const app = require('./app');

// tests for the first entity
describe('GET request number 1 for game requests', () => {
    test('GET /game/request succeeds', () => {
        return request(app)
        .get('/game/request?game_request=o')
        .expect(200);
    });

    test('GET /game/request returns json', () => {
        return request(app)
        .get('/game/request?game_request=o')
        .expect('Content-type', /json/);
    });

    test('GET /game/request returns the correct json for the request', async () => {
        const response = await request(app).get('/game/request?game_request=o');
    expect(response.body).toEqual([
    'Avalon',
    'Saboteur Gold',
    'Terraforming Mars',
    'Dobble',
    'King Domino',
    'Cluedo',
    'Colt Express',
    'Port Royal'
]);
    });

    test('GET /game/request gives error 400 if the wrong parameter provided', () => {
        return request(app)
        .get('/game/request?sdfdfgegerg')
        .expect(400);
    });
});

describe('GET request number 2 for game requests', () => {
    test('GET /game/details succeeds for details on "King Domino"', () => {
        return request(app)
        .get('/game/details?game=King Domino')
        .expect(200);
    });

    test('GET /game/details  returns JSON from details on "King Domino"', () => {
        return request(app)
        .get('/game/details?game=King Domino')
        .expect('Content-type', /json/);
    });

    test('GET /game/details returns the correct json for the request', async () => {
    const response = await request(app).get('/game/details?game=King Domino');
    expect(response.body).toEqual({
    gameID: 'King Domino',
    submittedby: 'Ryan',
    date: '24/1/2022',
    HasaCopy: false
});
    });

    test('GET /game/details gives error 400 if the wrong parameter provided', () => {
        return request(app)
        .get('/game/details?sdfdfgegerg')
        .expect(400);
    });
});

describe('POST request for game requests', () => {
    test('POST /game/new succeeds', () => {
        const params = { gameID: 'Hanabi', submittedby: 'Ryan', HasaCopy: true };
        return request(app)
        .post('/game/new')
        .send(params)
        .expect(200);
    });

    test('POST /game/new fails as a duplicate game is submitted', () => {
        const params = { gameID: 'Hanabi', submittedby: 'Bob', HasaCopy: false };
        return request(app)
        .post('/game/new')
        .send(params)
        .expect(400);
    });
});

    describe('GET request number 1 for game reviews', () => {
    test('GET /game/reviews succeeds', () => {
        return request(app)
        .get('/game/reviews?game_review=a')
        .expect(200);
    });
    test('GET /game/reviews returns json', () => {
        return request(app)
        .get('/game/reviews?game_review=a')
        .expect('Content-type', /json/);
    });
    test('GET /game/reviews returns the correct json for the request', async () => {
    const response = await request(app).get('/game/reviews?game_review=c');
    expect(response.body).toEqual([
    'Cluedo by Sally',
    'Colt Express by James',
    'Cluedo by Harry'
]);
});
    test('GET /game/reviews gives error 400 if the wrong parameter provided', () => {
        return request(app)
        .get('/game/reviews?sdfdfgegerg')
        .expect(400);
    });
});

   describe('GET request number 2 for game reviews', () => {
    test('GET /review/details succeeds', () => {
        return request(app)
        .get('/review/details?review=Avalon by James')
        .expect(200);
    });

    test('GET /review/details returns back json', () => {
        return request(app)
        .get('/review/details?review=Avalon by James')
        .expect('Content-type', /json/);
    });

    test('GET /review/details  returns JSON from details on Avalon by James', async () => {
        const response = await request(app).get('/review/details?review=Avalon by James');
        expect(response.body).toEqual({
    gameID: 'Avalon',
    submittedby: 'James',
    rating: 9,
    comment: 'Great fun and I managed to win!'
});
    });

    test('GET /review/details gives error 400 if the wrong parameter provided', () => {
        return request(app)
        .get('/review/details?sdfdfgegerg')
        .expect(400);
    });
});
describe('POST request for game reviews', () => {
    test('POST /review/new succeeds', () => {
        const params = { gameID: 'King Domino', submittedby: 'Alex', rating: 7, comment: 'Good game for four players and good skill level although you play almost independantly from one another.' };
        return request(app)
        .post('/review/new')
        .send(params)
        .expect(200);
    });
    test('POST /review/new fails as score is greater than 10 that is submitted', () => {
        const params = { gameID: 'Dobble', submittedby: 'Jon', rating: 420, comment: 'Meh' };
        return request(app)
        .post('/review/new')
        .send(params)
        .expect(400);
    });

    test('POST /review/new fails as the review is for a game which has not been requested', () => {
        const params = { gameID: 'Bingo', submittedby: 'Jon', rating: 8, comment: 'Alright' };
        return request(app)
        .post('/review/new')
        .send(params)
        .expect(400);
    });
});
