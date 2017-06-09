var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var faqData = require('./faqData');
var contributorData = require('./contributorData');
var photoData = require('./photoData');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get(/\/(index([.]html)?)?$/, function (req, res, next) {
  var templateArgs = {
    photos: photoData,
    searchBar: true,
    style: "./style.css",
    addButton: true,
    newMeme: true
  };
  res.render('index', templateArgs);
});

app.get(/\/(faq([.]html)?)?$/, function (req, res, next) {
  var template_arguments = {
    faqs: faqData,
    searchBar: false,
    style: "./style.css"
  };
  res.render('faqPage', template_arguments);
});

app.get(/\/(contributors([.]html)?)?$/, function (req, res, next) {
  var template_arguments = {
    contributors: contributorData,
    searchBar: false,
    style: "./style.css"
  };
  res.render('contributorPage', template_arguments);
});

app.get('/:num', function (req, res, next) {
  var num = req.params.num;
  var photoDex = photoData[num];
  if(photoDex) {
    var template_arguments = {
      photos: [photoDex],
      searchBar: false,
      style: "./commentStyle.css",
      addButton: false,
      newMeme: false
    };
    res.render('index', template_arguments);
  } else {
    next();
  }
});

app.get('*', function(req, res){
  res.status(404).render('404Page');
});


app.post('/addMeme', function(req, res, next){

	if(true){
 
		if(req.body && req.body.url){
	
			var photo = {
				url: req.body.url,
				description: req.body.description,
				index: "/"+photoData.length
			};

			photoData.push(photo);

      fs.writeFile('photoData.json', JSON.stringify(photoData), function(err){
        if(err){
          res.status(500).send("Error saving meme");
        } else{
          res.status(200).json(photoData.length);
        }
      });
		} else{
      res.status(400).send("Invalid Photo URL");
    }
	} else{
    next();
  }
});

app.listen(port, function(){
  console.log('Server listening on port ' + port);
});
