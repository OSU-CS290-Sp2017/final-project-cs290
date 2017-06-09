var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var faqData = require('./faqData');
var contributorData = require('./contributorData');
var photoData = require('./photoData');
var commentData = require('./commentData');
var port = process.env.PORT || 3000;

var app = express();

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
      comments: commentData,
      addButton: false,
      searchBar: false,
      style: "./commentStyle.css"
    };
    res.render('commentPage', template_arguments);
  } else {
    next();
  }
});

app.get('*', function(req, res){
  var template_arguments = {
    style: "./style.css"
  }
  res.status(404).render('404Page', template_arguments);
});

app.listen(port, function(){
  console.log('Server listening on port ' + port);
});
