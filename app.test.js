'use strict';

const request = require('supertest');
const app = require('./app');

//tests for the first entity
describe('Test the games requests service', () => {
    test('GET /game/request requesting game requests containing "o" in to see if it succeeds', () => {
        return request(app)
	    .get('/game/request?game_request=o')
	    .expect(200);
    });
	
	test('GET /game/request returns json for game requests containing "o"', () => {
        return request(app)
	    .get('/game/request?game_request=o')
	    .expect('Content-type', /json/);
    });
	
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

    test('POST /game/new succeeds', () => {
        const params = {"gameID": "Port Royal", "submittedby": "Ryan" , "HasaCopy": true};
        return request(app)
        .post('/game/new')
        .send(params)
	    .expect(200);
    });
	
});	
	
	
	describe('Test the games reviews service', () => {
    test('GET /game/reviews requesting game reviews for game containing "a" in succeeds', () => {
        return request(app)
	    .get('/game/reviews?game_review=a')
	    .expect(200);
    });
	
	test('GET /game/reviews returns json for game reviews for games containing "a"', () => {
        return request(app)
	    .get('/game/reviews?game_review=a')
	    .expect('Content-type', /json/);
    });
	
    test('GET /review/details requesting more details for the review by "James" on "Avalon" to see if it succeeds', () => {
        return request(app)
	    .get('/review/details?review=Avalon by James')
	    .expect(200);
    });
	
    test('GET /review/details  testing if the details on "James" review on "Avalon" returns back json', () => {
        return request(app)
	    .get('/review/details?review=Avalon by James')
	    .expect('Content-type', /json/);
    });

    test('POST /review/new succeeds', () => {
        const params = {"gameID": "King Domino", "submittedby": "Alex", "rating": 7, "comment": "Good game for four players and good skill level although you play almost independantly from one another."}
        return request(app)
        .post('/review/new')
        .send(params)
	    .expect(200);
    });
});	