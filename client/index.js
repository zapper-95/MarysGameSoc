/* eslint-disable no-tabs */
// some of the code from https://github.com/stevenaeola/goats/blob/main/client/script.js helped me write this here

const gf = document.getElementById('game_request_form'); // When an input is added to the "game" field for a game request
gf.addEventListener('input', async function (event) {
let lis = '';
    try {
		const data = new FormData(gf);
		const params = new URLSearchParams(data);
		const response = await fetch('http://127.0.0.1:8090/game/request?' + params);
		const requests = await response.json();
		for (let i = 0; i < requests.length; i++) {
			const request = requests[i];
			lis += `<li class="list-group-item" id = "${request}lis">${request}`;
    }
      document.getElementById('request_content').innerHTML = lis;
    } catch (e) {
      alert(e);
    }
  });

const grf = document.getElementById('search_game_review_form'); // When an input is added to the "game" when searching for a game review
  grf.addEventListener('input', async function (event) {
const id = document.getElementById('search_game_review').value;
let lis = '';
    try {
      const response = await fetch('http://127.0.0.1:8090/game/reviews?game_review=' + id);
      const reviews = await response.json();
      for (let i = 0; i < reviews.length; i++) {
const review = reviews[i];
lis += `<li class="list-group-item" id = "${review}lis">${review}`;
    }
      document.getElementById('review_content').innerHTML = lis;
    } catch (e) {
alert(e);
    }
  });

// code adapted from https://stackoverflow.com/questions/58157653/event-listener-for-when-child-of-parent-is-clicked
document.getElementById('request_content').addEventListener('click', async function (event) { // When one of the games requested is clicked on for more detail
  if (event.target !== this && this.contains(event.target) && event.target.parentNode === this && event.target.childElementCount <= 1) {
	let lis = '';
	try {
		const id = event.target.innerText;

		const response = await fetch('http://127.0.0.1:8090/game/details?game=' + id);
		const game = await response.json();

		const relatedEntityResponse = await fetch('http://127.0.0.1:8090/game/reviews?game_review=' + id);
		const reviews = await relatedEntityResponse.json();

		lis += id;
		lis += `<h3>Submitted By: ${game.submittedby}</h3>`;
		lis += `<h3>Date: ${game.date}</h3>`;
		lis += `<h3>Has a copy: ${game.HasaCopy}</h3>`;
		for (let i = 0; i < reviews.length; i++){
			lis += `<h4>${reviews[i].replace(id , "Review Submitted")}</h4>`;
		}

		document.getElementById(`${id}lis`).innerHTML = lis;
	} catch (e) {
		alert(e);
	}
  }
});

document.getElementById('review_content').addEventListener('click', async function (event) { // When one of the games reviews is clicked on for more detail
  if (event.target !== this && this.contains(event.target) && event.target.parentNode === this && event.target.childElementCount <= 1) {
	let lis = '';
	try {
		const id = event.target.outerText;
		const response = await fetch('http://127.0.0.1:8090/review/details?review=' + id);
		const review = await response.json();

		const relatedEntityResponse = await fetch('http://127.0.0.1:8090/game/details?game=' + review.gameID);
		const request = await relatedEntityResponse.json();
		lis += id;

		lis += `<h3>Rating: ${review.rating}/10</h3>`;

		lis += `<h3>Comment: ${review.comment}</h3>`;
		lis += `<h4>Game Requested by: ${request.submittedby}</h4>`;
		lis += `<h4>Request Submitted on: ${request.date}</h4>`;

		document.getElementById(`${review.gameID} by ${review.submittedby}lis`).innerHTML = lis;
	} catch (e) {
		alert(e);
	}
  }
});

document.getElementById('submit_game_request').addEventListener('click', async function (event) { // When the submit button is pressed for a game request
		const gamename = document.getElementById('game_request').value;
		const submittedby = document.getElementById('requester_name').value;
		const HasaCopy = document.getElementById('flexCheckDefault').checked;

	try {
		const response = await fetch('http://127.0.0.1:8090/game/new',
    {
        method: 'post',
        headers: {
         Accept: 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
        },

        body: JSON.stringify({ gameID: gamename, submittedby: submittedby, HasaCopy: HasaCopy })

    });
    const jsonContent = await response.json();
	// resets all of the forms and checkboxes
	document.getElementById('requester_name').value = '';
	document.getElementById('game_request').value = '';
	document.getElementById('flexCheckDefault').checked = false;

    alert(jsonContent);
	} catch (e) {
		alert(e);
	}
});

document.getElementById('submit_game_review').addEventListener('click', async function (event) { // When the submit button is pressed for a game request
		const gamename = document.getElementById('game_review').value;
		const submittedby = document.getElementById('reviewer_name').value;
		const rating = document.getElementById('game_rating').value;
		const comment = document.getElementById('review_comment').value;

	try {
		const response = await fetch('http://127.0.0.1:8090/review/new',
    {
        method: 'post',
        headers: {
         Accept: 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
        },

        body: JSON.stringify({ gameID: gamename, submittedby: submittedby, rating: rating, comment: comment })

    });
    const jsonContent = await response.json();
	// resets all of the forms and checkboxes
	document.getElementById('game_review').value = '';
	document.getElementById('reviewer_name').value = '';
	document.getElementById('game_rating').value = '';
	document.getElementById('review_comment').value = '';

    alert(jsonContent);
	} catch (e) {
		alert(e);
	}
});

// stops the enter key submitting the forms
// code from https://stackoverflow.com/questions/5629805/disabling-enter-key-for-form
   document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
