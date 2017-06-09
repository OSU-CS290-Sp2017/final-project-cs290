window.onload=function(){
	var memeContainer = document.querySelector('main.photo-container');

	var addButton = document.getElementById("add-meme-button");
	var newMemeCancel = document.getElementById("new-meme-cancel");
	var link = document.getElementById("new-meme-link");
	var searchBar = document.getElementById("navbar-searchBar");
	var deleteButton = document.getElementsByClassName('close-button');

	link.addEventListener('keyup', displayImg);
	addButton.addEventListener('click', addMeme);
	newMemeCancel.addEventListener('click', exitMemeAdder);
	searchBar.addEventListener('keyup', filterMeme);
	for (var i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener('click', deleteMeme);
	}

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
		document.getElementById("new-meme-link").value="";
		document.getElementById("new-meme-subtitle").value="";
		document.getElementById("new-meme-backdrop").classList.add("hidden");
		document.getElementById("new-meme").classList.add("hidden");
		document.getElementById("new-meme-button-container").classList.add("hidden");
	}
	function filterMeme() {
		var searchString = searchBar.value.trim().toUpperCase();
		if (memeContainer.hasChildNodes()) {
			var memeArray = memeContainer.getElementsByTagName('article');
			var caption;

			for (var i = 0; i < memeArray.length; i++) {
				caption = memeArray[i].querySelector('p.photo-subtitle').textContent.trim().toUpperCase();

				if (caption.indexOf(searchString) !== -1) {
					memeArray[i].classList.remove('hidden');
				}
				else {
					memeArray[i].classList.add('hidden');
				}
			}
		}
	}
	function deleteMeme(event) {
		var photoElement = event.target.parentElement.parentElement;
		var photoID = photoElement.querySelector('a.comment-link').getAttribute('href');

		var deleteRequest = new XMLHttpRequest();
		deleteRequest.open('DELETE', photoID, true);
		
		deleteRequest.onload = function(event) {
			if (deleteRequest.readyState == 4) {
				if (deleteRequest.status == 200) {
					photoElement.classList.add('hidden');
				} else {
					console.error(deleteRequest);
				}
			}
		};

		deleteRequest.send(null);
	}
}
