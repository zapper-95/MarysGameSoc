const express = require('express');
const app = express();

app.use(express.static('client'));
app.use(express.json());


const requests = require("./requests.json");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


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

app.listen(8090);