//some of the code from https://github.com/stevenaeola/goats/blob/main/client/script.js helped me write this here

const gf = document.getElementById("game_request_form")
  gf.addEventListener('input', async function(event){
   //event.preventDefault(); //don't want the replace the page with only the content from the request

	  let lis = "";
    try{
	  const data =  new FormData(gf);
	  const params = new URLSearchParams(data);
      const response = await fetch('http://127.0.0.1:8090/game/request?' + params);
		console.log(params)
      let requests = await response.json();
      for (let request of requests){
        lis += `<li class="list-group-item">${request.name}`; 
    }
      document.getElementById('request_content').innerHTML=lis;
    } catch(e) {
      alert(e);
    }
  });



//code adapted from https://stackoverflow.com/questions/58157653/event-listener-for-when-child-of-parent-is-clicked
document.getElementById("request_content").addEventListener('click', function(e) {
  if (e.target !== this && this.contains(e.target)) {    
    console.log(e.target.outerText);  
  }
});
