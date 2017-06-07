var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var faqData = require('./faqData');
var contributorData = require('./contributorData');
var port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get(/\/(index([.]html)?)?$/, function (req, res, next) {
  var templateArgs = {
    searchBar: true
  };
  res.render('index', templateArgs);
});

app.get(/\/(faq([.]html)?)?$/, function (req, res, next) {
  var template_arguments = {
    faqs: faqData,
    searchBar: false
  };
  res.render('faqPage', template_arguments);
});

app.get(/\/(contributors([.]html)?)?$/, function (req, res, next) {
  var template_arguments = {
    contributors: contributorData,
    searchBar: false
  };
  res.render('contributorPage', template_arguments);
});

app.get('*', function(req, res){
  res.status(404).render('404Page');
});

app.listen(port, function(){
  console.log('Server listening on port ' + port);
});
