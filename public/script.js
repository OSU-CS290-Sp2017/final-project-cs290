window.onload=function(){
	//Container that holds all of the memes
	var memeContainer = document.querySelector('main.photo-container');

	//Getting various specific elements from the page
	var addButton = document.getElementById("add-meme-button");
	var newMemeCancel = document.getElementById("new-meme-cancel");
	var link = document.getElementById("new-meme-link");
	var searchBar = document.getElementById("navbar-searchBar");
	var deleteButton = document.getElementsByClassName('close-button');

	//Connecting various event listeners to each of the elements collected above
	link.addEventListener('keyup', displayImg);
	addButton.addEventListener('click', addMeme);
	newMemeCancel.addEventListener('click', exitMemeAdder);
	searchBar.addEventListener('keyup', filterMeme);
	for (var i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener('click', deleteMeme);
	}

	//I assumed that when you press any key while selecting the new meme link, it will display an image?
	function displayImg(){
		var img = document.getElementById("new-meme-image");
		img.src = link.value;
	}

	//When this function calls, it stops the modal from being hidden, and displays it to the user
	function addMeme() {
		document.getElementById("new-meme-backdrop").classList.remove("hidden");
		document.getElementById("new-meme").classList.remove("hidden");
		document.getElementById("new-meme-button-container").classList.remove("hidden");
	}

	//resets the modal when the user hits cancel
	function exitMemeAdder() {
		document.getElementById("new-meme-image").src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/-Insert_image_here-.svg/2000px--Insert_image_here-.svg.png";
		document.getElementById("new-meme-link").value="";
		document.getElementById("new-meme-subtitle").value="";
		document.getElementById("new-meme-backdrop").classList.add("hidden");
		document.getElementById("new-meme").classList.add("hidden");
		document.getElementById("new-meme-button-container").classList.add("hidden");
	}

	//When entering a term into the searchbar, it filters through all of the memes on the page and displays ones relevant
	function filterMeme() {
		//Collects the string from the search bar
		var searchString = searchBar.value.trim().toUpperCase();

		if (memeContainer.hasChildNodes()) {

			//Obtains all of the memes on the webpage and loops through them
			var memeArray = memeContainer.getElementsByTagName('article');
			var caption;

			for (var i = 0; i < memeArray.length; i++) {
				caption = memeArray[i].querySelector('p.photo-subtitle').textContent.trim().toUpperCase();

				//checks if the current meme has content relevant to the search
				if (caption.indexOf(searchString) !== -1) {
					memeArray[i].classList.remove('hidden');
				}
				else {
					memeArray[i].classList.add('hidden');
				}
			}
		}
	}

	//When clicking the x button on a meme, this will delete the meme.
	function deleteMeme(event) {
		//Gets info associated with the current meme being clicked on.
		var photoElement = event.target.parentElement.parentElement;
		var photoID = photoElement.querySelector('a.comment-link').getAttribute('href');

		//Starts a new delete type request.
		var deleteRequest = new XMLHttpRequest();
		deleteRequest.open('DELETE', photoID, true);

		//Callback function, used when the request has finished and a response has been sent.
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
		window.location.reload();
	}
}
