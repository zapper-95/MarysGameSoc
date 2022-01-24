const express = require('express');
const app = express();

app.use(express.static('client'));
app.use(express.json());


const requests = require("./requests.json");


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
	let results = [];
	for (let i = 0; i < requests.length; i++) {
		let request = requests[i]
		if (request.name.toUpperCase() == search) {
			resp.send(request)
		}
	}
  
  //resp.send("");
});


app.post('/game/new', (req, res) => {
  
	console.log(req.body)
	res.send(req.body)   // send back the posted data
})


app.listen(8090);