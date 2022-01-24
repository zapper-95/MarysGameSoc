const express = require('express');
const fs  = require('fs');
const app = express();

app.use(express.static('client'));
app.use(express.json());


const requests = require("./requests.json");
const reviews = require("./requests.json");

app.get('/game/request', function (req, resp){
  const search = req.query.game_request.toUpperCase();
  let results = [];
	if(search != ""){
		for (let i = 0; i < requests.length; i++) {
    		let request = requests[i];
    		if (request.name.toUpperCase().includes(search)) {
      			results.push(request);
    		}
  		}		
		
	}

  resp.send(results);
});


app.get('/game/details', function (req, resp){
	const search = req.query.game.toUpperCase();
	for (let i = 0; i < requests.length; i++) {
		let request = requests[i]
		if (request.name.toUpperCase() == search) {
			resp.send(request)
		}
	}
});


app.post('/game/new', (req, resp) => {
	let date = new Date();
	
	// code for getting the date https://stackabuse.com/how-to-get-the-current-date-in-javascript/
	const fulldate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

	const submittedby = req.body.submittedby;
	const HasaCopy = req.body.HasaCopy;
	
	
	
	const name = req.body.name;
	
	var gameAlreadyRequested = false;
	
	for (let i = 0; i < requests.length; i++) {
		let request = requests[i]
		if (request.name.toUpperCase() == name.toUpperCase()) {
			gameAlreadyRequested = true;
		}
	}
	
	if(!gameAlreadyRequested){
		const gamerequest = { 'name': name,
							'submittedby': submittedby,
							'date': fulldate,
							'HasaCopy': HasaCopy };
		requests.push(gamerequest);
		

		fs.writeFileSync('./requests.json', JSON.stringify(requests));
		
		
		resp.json("Request Successfully Recieved!")	
			
	}
	else{
		resp.json("Game Already Requested!")	
		
	}
		
		
	
	
});




app.listen(8090);