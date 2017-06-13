//Global variables used to keep track of certain elements on the page
var memeContainer;
var addButton;
var newMemeCancel;
var link;
var newMemeCreate;
var searchBar;
var deleteButton;
var createMemeImg;

window.addEventListener('DOMContentLoaded', function(event){
	//Container that holds all of the memes
	memeContainer = document.querySelector('main.photo-container');
	addButton = document.getElementById("add-meme-button");
	newMemeCancel = document.getElementById("new-meme-cancel");
	link = document.getElementById("new-meme-link");
	newMemeCreate = document.getElementById("new-meme-create");
	searchBar = document.getElementById("navbar-searchBar");
	deleteButton = document.getElementsByClassName('close-button');
<<<<<<< HEAD
	commentButton = document.getElementById('createCommentButton');
=======
	createMemeImg = document.getElementById('new-meme-image');
>>>>>>> 5d8744adb1fff7fb66bcf294ddec27069cbae1ac

	//Connecting various event listeners to each of the elements collected above
	if(link != null){link.addEventListener('keyup', displayImg);}
	if(addButton != null){addButton.addEventListener('click', addMeme);}
	if(newMemeCancel != null){newMemeCancel.addEventListener('click', exitMemeAdder);}
	if(newMemeCreate != null){newMemeCreate.addEventListener('click', insertMeme);}
	if(commentButton != null){commentButton.addEventListener('click', insertComment);}
	if(searchBar != null){searchBar.addEventListener('keyup', filterMeme);}
	for (var i = 0; i < deleteButton.length; i++) {
		if(deleteButton != null){deleteButton[i].addEventListener('click', deleteMeme);}
	}
});

	//when the user types something into the create meme image box, it automatically updates with the image they entered
	function displayImg(){
		createMemeImg.src = link.value;
	}

	//When this function calls, it stops the modal from being hidden, and displays it to the user
	function addMeme() {
		document.getElementById("new-meme-backdrop").classList.remove("hidden");
		document.getElementById("new-meme").classList.remove("hidden");
		document.querySelector(".new-meme-button-container").classList.remove("hidden");
	}

	//resets the modal when the user hits cancel
	function exitMemeAdder() {
		document.getElementById("new-meme-image").src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/-Insert_image_here-.svg/2000px--Insert_image_here-.svg.png";
		document.getElementById("new-meme-link").value="";
		document.getElementById("new-meme-subtitle").value="";
		document.getElementById("new-meme-backdrop").classList.add("hidden");
		document.getElementById("new-meme").classList.add("hidden");
		document.querySelector(".new-meme-button-container").classList.add("hidden");
	}


	function insertMeme(){
		var photoUrl = link.value || '';
		var subtitle = document.getElementById("new-meme-subtitle").value || '';

		if(photoUrl.trim() && subtitle.trim()){

			storeMeme(photoUrl, subtitle, function(err, memeIndex){ //store to the JSON
			exitMemeAdder();

			if(err){
				alert("ERROR: " + err);
			}
			else if(memeIndex == -1){ //photo wasn't received
				alert("Photo URL Invalid");
			}
			else{

				var memeTemplate = Handlebars.templates.photo;
				var templateArgs = {
					url: photoUrl,
					description: subtitle,
					index: "/" + memeIndex
				};

				var memeHTML = memeTemplate(templateArgs);

				var photoContainer = document.querySelector('.photo-container');
				photoContainer.insertAdjacentHTML('beforeend', memeHTML);

				var photoCloseButtonArray = photoContainer.getElementsByClassName('close-button')
				photoCloseButtonArray[photoCloseButtonArray.length - 1].addEventListener('click', deleteMeme)
			}
			});

		}
		else if(!subtitle.trim()){
			alert("Error, Subtitle must not be blank");
		}
		else{
			alert("Error, URL must not be blank");
		}
	}

	function storeMeme(photoUrl, description, callback){
		var postURL = "/addMeme";

		var postRequest = new XMLHttpRequest();
		postRequest.open('POST', postURL);
		postRequest.setRequestHeader('Content-Type', 'application/json');

		postRequest.addEventListener('load', function(event){
			var error;
			var memeIndex = event.target.response;
			if(event.target.status !== 200){
				error = event.target.response;
				memeIndex = -1;
			}

			callback(error, memeIndex);
		});

		var postBody = {
			url: photoUrl,
			description: description
		};
		postRequest.send(JSON.stringify(postBody));
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
	}

	function insertComment() {
		var commentBox = getElementsByClassName('comment-box');
		var comment = commentBox.value;

		storeComment(comment, index)

	}

	function storeComment(comment, index, ) {

	}
