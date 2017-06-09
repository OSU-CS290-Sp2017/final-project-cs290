window.onload=function(){
	var memeContainer = document.querySelector('main.photo-container');

	var addButton = document.getElementById("add-meme-button");
	var newMemeCancel = document.getElementById("new-meme-cancel");
	var link = document.getElementById("new-meme-link");
	var searchBar = document.getElementById("navbar-searchBar")

	link.addEventListener('keyup', displayImg);
	addButton.addEventListener('click', addMeme);
	newMemeCancel.addEventListener('click', exitMemeAdder);
	searchBar.addEventListener('keyup', filterMeme);

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
		document.getElementById("new-meme-image").src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/-Insert_image_here-.svg/2000px--Insert_image_here-.svg.png";
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
}
