var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var faqData = require('./faqData');
var contributorData = require('./contributorData');
var photoData = require('./photoData');
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

app.delete('/:num', function(req, res, next) {
  console.log('in delete with num = ', req.params.num);

  res.status(200).send();
});

app.get('*', function(req, res){
  res.status(404).render('404Page');
});

app.listen(port, function(){
  console.log('Server listening on port ' + port);
});
