//some of the code from https://github.com/stevenaeola/goats/blob/main/client/script.js helped me write this here

const gf = document.getElementById("game_request_form")
  gf.addEventListener('input', async function(event){
   //event.preventDefault(); //don't want the replace the page with only the content from the request

	  let lis = "";
    try{
	  const data =  new FormData(gf);
	  const params = new URLSearchParams(data);
      const response = await fetch('http://127.0.0.1:8090/game/request?' + params);
      let requests = await response.json();
      for (let i = 0; i < requests.length; i++) {
		request = requests[i];
        lis += `<li class="list-group-item" id = "${request.name}lis">${request.name}`;
    }
      document.getElementById('request_content').innerHTML=lis;
    } catch(e) {
      alert(e);
    }
  });



//code adapted from https://stackoverflow.com/questions/58157653/event-listener-for-when-child-of-parent-is-clicked
document.getElementById("request_content").addEventListener('click', async function(event) {
  if (event.target !== this && this.contains(event.target)) {
	let lis = "";  
	try{
		const id = event.target.outerText;
		const response = await fetch('http://127.0.0.1:8090/game/details?game='+id);
		let game = await response.json();
		lis += id;
		lis += `<h3>Submitted By: ${game.submittedby}</h3>`;
		lis += `<h3>Date: ${game.date}</h3>`
		lis += `<h3>Has a copy: ${game.HasaCopy}</h3>`
		document.getElementById(`${id}lis`).innerHTML = lis;
	}catch(e){
		alert(e)
	}


  }
});
