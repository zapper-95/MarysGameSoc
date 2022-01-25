//some of the code from https://github.com/stevenaeola/goats/blob/main/client/script.js helped me write this here

const gf = document.getElementById("game_request_form"); //When an input is added to the "game" field for a game request
  gf.addEventListener('input', async function(event){ 

	  let lis = "";
    try{
	  const data =  new FormData(gf);
	  const params = new URLSearchParams(data);
      const response = await fetch('http://127.0.0.1:8090/game/request?' + params);
      let requests = await response.json();
      for (let i = 0; i < requests.length; i++) {
		request = requests[i];
        lis += `<li class="list-group-item" id = "${request.gameID}lis">${request.gameID}`;
    }
      document.getElementById('request_content').innerHTML=lis;
    } catch(e) {
      alert(e);
    }
  });

const grf = document.getElementById("search_game_review_form"); //When an input is added to the "game" when searching for a game review
  grf.addEventListener('input', async function(event){ 
	  const id =  document.getElementById("search_game_review").value;
	  let lis = "";
    try{
      const response = await fetch('http://127.0.0.1:8090/game/reviews?game_review=' + id);
      let reviews = await response.json();
      for (let i = 0; i < reviews.length; i++) {
		let review = reviews[i];
		lis += `<li class="list-group-item" id = "${review.gameID}${review.submittedby}lis">${review.gameID} by ${review.submittedby}`;
    }
      document.getElementById('review_content').innerHTML=lis;
    } catch(e) {
      alert(e);
    }
  });

//code adapted from https://stackoverflow.com/questions/58157653/event-listener-for-when-child-of-parent-is-clicked
document.getElementById("request_content").addEventListener('click', async function(event) { //When one of the games requested is clicked on for more detail
  if (event.target !== this && this.contains(event.target) && event.target.parentNode == this && event.target.childElementCount <= 1) {
	let lis = "";  
	try{
		const id = event.target.innerText;
		console.log(id);
		
		const response = await fetch('http://127.0.0.1:8090/game/details?game='+id);		
		let game = await response.json();
		
		const related_entity_response = await fetch('http://127.0.0.1:8090/game/reviews?game_review='+id);
		let reviews = await related_entity_response.json();
		
		lis += id;
		lis += `<h3>Submitted By: ${game.submittedby}</h3>`;
		lis += `<h3>Date: ${game.date}</h3>`
		lis += `<h3>Has a copy: ${game.HasaCopy}</h3>`
		
		let averageRating = 0;
		for (let i = 0; i < reviews.length; i++) { 
			averageRating += reviews[i].rating;
			
		}
		averageRating = Math.round((averageRating * 10)/reviews.length) / 10
		
		if(reviews.length > 0){
			lis += `<h3>Average rating: ${averageRating}</h3>`
		}
		else{
			lis += `<h3>Average rating: Unrated</h3>`
		}
		
		document.getElementById(`${id}lis`).innerHTML = lis;
	}catch(e){
		alert(e)
	}


  }
});


document.getElementById("review_content").addEventListener('click', async function(event) { //When one of the games reviews is clicked on for more detail
  if (event.target !== this && this.contains(event.target) && event.target.parentNode == this && event.target.childElementCount <= 1) {
	let lis = "";  
	try{
		const id = event.target.outerText;
		console.log(id);
		const response = await fetch('http://127.0.0.1:8090/review/details?review='+id);		
		let review = await response.json();
		
		const related_entity_response = await fetch('http://127.0.0.1:8090/game/request?game_request='+review.gameID);
		let request = await related_entity_response.json();
		//const related_entity_response = await fetch('http://127.0.0.1:8090/game/reviews?game_review='+id);
		//let reviews = await related_entity_response.json();
		console.log(request);
		console.log(review);
		lis += id;
		
		lis += `<h3>Rating: ${review.rating}/10</h3>`;
		
		lis += `<h3>Comment: ${review.comment}</h3>`
		lis += `<h4>Game Requested by: ${request[0].submittedby}</h4>`
		lis += `<h4>Request Submitted on: ${request[0].date}</h4>`
		console.log(review.gameID);

		
		document.getElementById(`${review.gameID}${review.submittedby}lis`).innerHTML = lis;
	}catch(e){
		alert(e)
	}


  }
});



document.getElementById("submit_game_request").addEventListener('click', async function(event){ //When the submit button is pressed for a game request
		let gamename = document.getElementById("game_request").value;
		let submittedby = document.getElementById("requester_name").value;
	    let HasaCopy = document.getElementById("flexCheckDefault").checked;
		console.log(gamename)
		console.log(submittedby)
		console.log(HasaCopy)
	try{
		let response = await fetch('http://127.0.0.1:8090/game/new', 
    {
        method: 'post',
        headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
        },
		
        body: JSON.stringify({gameID: gamename, submittedby: submittedby, HasaCopy: HasaCopy})


    })
    let jsonContent = await response.json();
	//resets all of the forms and checkboxes
	document.getElementById("requester_name").value = "";
	document.getElementById("game_request").value = "";
	document.getElementById("flexCheckDefault").checked = false;
			
    alert(jsonContent);
		
					
		
	} catch(e){
		alert(e)
	}	
});	
	
	



document.getElementById("submit_game_review").addEventListener('click', async function(event){ //When the submit button is pressed for a game request
		let gamename = document.getElementById("game_review").value;
		let submittedby = document.getElementById("reviewer_name").value;
	    let rating = document.getElementById("game_rating").value;
		let comment = document.getElementById("review_comment").value;
		console.log(gamename)
		console.log(submittedby)
		console.log(rating)
	try{
		let response = await fetch('http://127.0.0.1:8090/review/new', 
    {
        method: 'post',
        headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
        },
		
        body: JSON.stringify({gameID: gamename, submittedby: submittedby, rating: rating, comment: comment})


    })
    let jsonContent = await response.json();
	//resets all of the forms and checkboxes
	document.getElementById("game_review").value = "";
	document.getElementById("reviewer_name").value = "";
	document.getElementById("game_rating").value = "";
	document.getElementById("review_comment").value = "";
			
    alert(jsonContent);
		
					
		
	} catch(e){
		alert(e)
	}	
});	











//stops the enter key submitting the forms
//code from https://stackoverflow.com/questions/5629805/disabling-enter-key-for-form
   document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
            
        });
