/* eslint-disable no-tabs */
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('client'));
app.use(express.json());

const requests = require('./requests.json');
const reviews = require('./reviews.json');

app.get('/game/request', function (req, resp) {
	if (req.query.game_request === undefined) {
		resp.status(400).json('Required Parameters Missing');
	}
  const search = req.query.game_request.toUpperCase();
  const results = [];
  if (search !== '') {
	for (let i = 0; i < requests.length; i++) {
		const request = requests[i];
		if (request.gameID.toUpperCase().includes(search)) {
			results.push(request.gameID);
    }
	}
}

  resp.send(results);
});

app.get('/game/details', function (req, resp) {
	if (req.query.game === undefined) {
		resp.status(400).json('Required Parameters Missing');
	}
	const search = req.query.game.toUpperCase();
	let foundGame = false;
	for (let i = 0; i < requests.length; i++) {
		const request = requests[i];
		if (request.gameID.toUpperCase() === search) {
			foundGame = true;
			resp.send(request);
		}
	}
	if (!foundGame) {
		resp.json('Game Request not Found');
	}
});

app.post('/game/new', (req, resp) => {
	const date = new Date();

	// code for getting the date https://stackabuse.com/how-to-get-the-current-date-in-javascript/
	const fulldate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

	const submittedby = req.body.submittedby;
	const HasaCopy = req.body.HasaCopy;

	const gameID = req.body.gameID;

	let gameAlreadyRequested = false;

	for (let i = 0; i < requests.length; i++) {
		const request = requests[i];
		if (request.gameID.toUpperCase() === gameID.toUpperCase()) {
			gameAlreadyRequested = true;
		}
	}

	if (!gameAlreadyRequested) {
		const gamerequest = {
 gameID: gameID,
							submittedby: submittedby,
							date: fulldate,
							HasaCopy: HasaCopy
};
		requests.push(gamerequest);

		fs.writeFileSync('./requests.json', JSON.stringify(requests));

		resp.json('Request Successfully Recieved!');
	} else {
		resp.status(400).json('Game Already Requested!');
	}
});

app.get('/game/reviews', function (req, resp) {
	if (req.query.game_review === undefined) {
		resp.status(400).json('Required Parameters Missing');
	}
	const search = req.query.game_review.toUpperCase();
  const results = [];
	if (search !== '') {
		for (let i = 0; i < reviews.length; i++) {
			const review = reviews[i];
			if (review.gameID.toUpperCase().includes(search)) {
				results.push(review.gameID + ' by ' + review.submittedby);
			}
		}
	}

  resp.send(results);
});

app.get('/review/details', function (req, resp) {
	if (req.query.review === undefined) {
		resp.status(400).json('Required Parameters Missing');
	}
	let foundReview = false;
	const search = req.query.review.toUpperCase();
	for (let i = 0; i < reviews.length; i++) {
		const review = reviews[i];
		if (search.includes(review.gameID.toUpperCase()) && search.includes(review.submittedby.toUpperCase())) {
			foundReview = true;
			resp.send(review);
		}
	}
	if (!foundReview) {
		resp.json('Review Not Found');
	}
});

app.post('/review/new', (req, resp) => {
	// code for getting the date https://stackabuse.com/how-to-get-the-current-date-in-javascript/
	const gameID = req.body.gameID;
	const submittedby = req.body.submittedby;
	const rating = req.body.rating;
	let reviewIsForRequest = false;
	for (let i = 0; i < requests.length; i++) {
		const request = requests[i];
		if (request.gameID.toUpperCase() === gameID.toUpperCase()) {
			reviewIsForRequest = true;
		}
	}
	if (isNaN(parseInt(req.body.rating)) || parseInt(req.body.rating) < 1 || parseInt(req.body.rating) > 10) {
		resp.status(400).json('Rating is not a number in the range 1 to 10');
	} else if (!reviewIsForRequest) {
			resp.status(400).json('Unfortunately that game has not been requested yet to play so it cannot have a review');
			} else {
		const comment = req.body.comment;

		const gamereview = {
 gameID: gameID,
							submittedby: submittedby,
							rating: parseInt(rating),
							comment: comment
};
		reviews.push(gamereview);

		fs.writeFileSync('./reviews.json', JSON.stringify(reviews));

		resp.json('Review Successfully Recieved!');
}
});
module.exports = app;
