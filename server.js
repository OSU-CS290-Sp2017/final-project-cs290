var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use('/damgur', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get(/\/(index([.]html)?)?$/, function (req, res, next) {

  var templateArgs = {
    searchBar: 'visible'
  };

  res.render('index', templateArgs);
});

app.get(/\/faq([.]html)?/, function (req, res, next) {
  res.render('faq');
});


app.get('*', function(req, res){
  res.status(404).send('404');
});

app.listen(port, function(){
  console.log('Server listening on port ' + port);
});
