var express = require('express');
var request = require('request');
var engines = require('consolidate');
var FeedParser = require('feedparser');
var Stringify = require('streaming-json-stringify');

var url = 'http://www.lequipe.fr/rss/actu_rss_{sport}.xml';

var app = express();

// Static files
app.use(express.static('public'));
app.use(express.static('bower_components'));

// Engines
app.set('views', './templates');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Routes
app.get('/', function(req, res) {
    res.render('index.html');
});

var capitalize = function(str) {
    return str[0].toUpperCase() + str.slice(1);
};

app.get('/ajax/:sport', function(req, res) {
    request(url.replace('{sport}', capitalize(req.params.sport)))
        .pipe(new FeedParser())
        .pipe(Stringify())
        .pipe(res);
});

app.listen(5020);