//Importing needed components
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var faqData = require('./faqData');
var contributorData = require('./contributorData');
var photoData = require('./photoData');
var bodyParser = require('body-parser');
var findPhotoIndex = require('./findPhotoIndex')
var port = process.env.PORT || 3000;

//Starting our application as an express application
var app = express();
app.use(bodyParser.json());

//Initializing the engines used by the app.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Making all static files route to public
app.use(express.static(path.join(__dirname, 'public')));

//The get method that is called for any of the following URL's
//  "/"
//  "/index"
//  "/index.html"
//  Used to view the index, or home page for damgur
app.get(/\/(index([.]html)?)?$/, function (req, res, next) {

  //Setting the template arguments
  var template_arguments = {
    photos: photoData,
    searchBar: true,
    style: "./style.css",
    addButton: true,
    newMeme: true
  };

  //Rendering the index.handlebars page
  res.render('index', template_arguments);
});

//The get method that is called for any of the following URL's
//  "/faq"
//  "/faq.html"
//  Used to view the faq page for damgur
app.get(/\/faq([.]html)?$/, function (req, res, next) {

  //Setting up the template arguments
  var template_arguments = {
    faqs: faqData,
    searchBar: false,
    style: "./style.css"
  };

  //Rendering the faqPage.handlebars page
  res.render('faqPage', template_arguments);
});

//The get method that is called for any of the following URL's
//  "/contributors"
//  "/contributors.html"
//  Used to view the contributors page for damgur
app.get(/\/contributors([.]html)?$/, function (req, res, next) {

  //Setting up the template arguments
  var template_arguments = {
    contributors: contributorData,
    searchBar: false,
    style: "./style.css"
  };

  //Rendering the contributorPage.handlebars page
  res.render('contributorPage', template_arguments);
});

//The get method that is called for any of the following URL's
//  "/####"
//  Used to view the comments page for a specific meme image
app.get('/:num', function (req, res, next) {
  var photoIndex = Math.floor(req.params.num);
  var indexKey = '/' + photoIndex;
  if (photoIndex >= 0 && !isNaN(req.params.num) && photoData.some(function(photo) { return photo.index.trim() === indexKey.trim(); })) {

    //Retreives the photo information from the photoData json file
    var photo = photoData.find(function(photo) { return photo.index.trim() === indexKey.trim()});
    var commentDex = photo.comments;

    //If the photo exists
    if(photo) {

	  //Setting up the template arguments
      var template_arguments = {
        photo: photo,
        addButton: false,
        searchBar: false,
        comments: commentDex,
        style: "./commentStyle.css"
      };

      //Rendering the commentPage.handlebars page
      res.render('commentPage', template_arguments);
    } else {
      next();
    }

  }
  else {
    next();
  }
});

//The delete method that is called for any of the following URL's
//  ""/####""
//  Used when clicking the x button on the top right of an image, causing it to be deleted from the website
app.delete('/:num', function(req, res, next) {

  //Error checking the :num param to see if it is a positive number
  var photoIndex = Math.floor(req.params.num);
  if (photoIndex < 0 || isNaN(req.params.num)) {
    res.status(500).send('Index provided must be a positive integer.')
	return;
  }

  //Obtaining the photo data from the photoData json file
  var photoID = '/' + photoIndex;
  for (var i = 0; i < photoData.length; i++) {
    if (photoData[i].index.trim() === photoID.trim()) {
	  photoData.splice(i, 1);
	  break;
    }
  }
  
  //The former code that was here that reordered the index wouldn't work because if you change the serverside
  //data the client side data stays exactly the same. So the links we have for the comments that go to the photos
  //comments page, would still have the same index number, but if we change the photo data, clicking on the comments
  //link would either try to load a photo that doesn't exist, or load an entirely different photo.

  //Rewriting the changes to the file
  fs.writeFile('./photoData.json', JSON.stringify(photoData), function(err) {
	if (err) {
	  //Send a 500 code if there is an error
      res.status(500).send('Unable to remove photo from database');
	} else {
	  //Send a 200 code if everything goes right
      res.status(200).send();
    }
  });
});

//The get method that is called when a url route does not match any of the above routes, or the static files in public.
//Generates the 404 page, as the page requested could not be found.
app.get('*', function(req, res){
  var template_arguments = {
    style: "./style.css"
  }
  res.status(404).render('404Page', template_arguments);
});


app.post('/addMeme', function(req, res, next){

  if(req.body && req.body.url){
    
    var newIndex = findPhotoIndex(photoData, function(sortedData) { photoData = sortedData; });

    var photo = {
	  url: req.body.url,
	  description: req.body.description,
	  index: "/" + newIndex
    };

	photoData.splice(newIndex, 0, photo);

    fs.writeFile('photoData.json', JSON.stringify(photoData), function(err){
      if(err){
        res.status(500).send("Error saving meme");
      } else{
        res.status(200).json(newIndex);
      }
    });
  } else{
    res.status(400).send("Invalid Photo URL");
  }
});


//Starting the server by booting up a host on the given port

app.listen(port, function(){
  console.log('Server listening on port ' + port);
});
