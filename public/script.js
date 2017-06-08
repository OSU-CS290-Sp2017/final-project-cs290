

window.onload=function(){
	
var link = document.getElementById("new-meme-link");
link.addEventListener('keyup', displayImg);

function displayImg(){
	var img = document.getElementById("new-meme-image");
	img.src = link.value;
}
}