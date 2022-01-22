
loadHome();



function loadHome(){
 document.getElementById("home").style.display = "block";
document.getElementById("requested").style.display = "none";
document.getElementById("review").style.display = "none";


}
function loadRequests(){
 document.getElementById("home").style.display = "none";
document.getElementById("requested").style.display = "block";
document.getElementById("review").style.display = "none";

}
function loadReviews(){
 document.getElementById("home").style.display = "none";
document.getElementById("requested").style.display = "none";
document.getElementById("review").style.display = "block";

}

document.getElementById("homenav").addEventListener("click", loadHome); 
document.getElementById("requestnav").addEventListener("click", loadRequests);
document.getElementById("reviewnav").addEventListener("click", loadReviews);
