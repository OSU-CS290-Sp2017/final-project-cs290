window.onload=function(){

	var addButton = document.getElementById("add-meme-button");
	var newMemeCancel = document.getElementById("new-meme-cancel");
	var link = document.getElementById("new-meme-link");

	link.addEventListener('keyup', displayImg);
	addButton.addEventListener('click', addMeme);
	newMemeCancel.addEventListener('click', exitMemeAdder);

	function displayImg(){
		var img = document.getElementById("new-meme-image");
		img.src = link.value;
	}

	function addMeme() {
		document.getElementById("new-meme-backdrop").classList.remove("hidden");
		document.getElementById("new-meme").classList.remove("hidden");
		document.getElementById("new-meme-button-container").classList.remove("hidden");
	}

	function exitMemeAdder() {
		document.getElementById("new-meme-backdrop").classList.add("hidden");
		document.getElementById("new-meme").classList.add("hidden");
		document.getElementById("new-meme-button-container").classList.add("hidden");

		document.getElementById("new-meme-link").value="";
		document.getElementById("new-meme-subtitle").value="";
	}
}
