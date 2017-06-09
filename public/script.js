window.addEventListener('DOMContentLoaded', function(event){

	addButton = document.getElementById("add-meme-button");
	newMemeCancel = document.getElementById("new-meme-cancel");
	link = document.getElementById("new-meme-link");
	newMemeCreate = document.getElementById("new-meme-create");

	link.addEventListener('keyup', displayImg);
	addButton.addEventListener('click', addMeme);
	newMemeCancel.addEventListener('click', exitMemeAdder);
	newMemeCreate.addEventListener('click', insertMeme);

});
	function displayImg(){
		var img = document.getElementById("new-meme-image");
		img.src = link.value;
	}

	function addMeme() {
		document.getElementById("new-meme-backdrop").classList.remove("hidden");
		document.getElementById("new-meme").classList.remove("hidden");
		document.querySelector(".new-meme-button-container").classList.remove("hidden");
	}

	function exitMemeAdder() {
		document.getElementById("new-meme-link").value="";
		document.getElementById("new-meme-subtitle").value="";
		document.getElementById("new-meme-backdrop").classList.add("hidden");
		document.getElementById("new-meme").classList.add("hidden");
		document.querySelector(".new-meme-button-container").classList.add("hidden");
	}
	
	function insertMeme(){
		var photoUrl = link.value || '';
		var subtitle = document.getElementById("new-meme-subtitle").value || '';
		var photoIndex;
		
		if(photoUrl.trim() && subtitle.trim()){
			
			photoIndex = storeMeme(photoUrl, subtitle, function(err){ //store to the JSON
			
			if(err){
				alert("ERROR: " + err);
			} 
			else if(photoIndex == -1){ //photo wasn't received
				alert("Photo URL Invalid");
			}
			else{
				
				var memeTemplate = Handlebars.templates.photo;
				Handlebars.templates.photo;
				var templateArgs = {
					url: photoUrl,
					description: subtitle,
					index: photoIndex
				};
				
				var memeHTML = memeTemplate(templateArgs);
				

				var photoContainer = document.querySelector('.photo-container');
				photoContainer.insertAdjeacentHTML('beforeend', memeHTML);
				
				exitMemeAdder();
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
			
			callback(error);
			
			
			return memeIndex;
		});
		
		var postBody = {
			url: photoUrl,
			description: description
		};
		postRequest.send(JSON.stringify(postBody));
	}

