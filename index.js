var express = require('express'),
    http = require('http'),
    logger = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}));

var entries = [];
app.locals.entries = entries;

/*app.use(function (request, response, next) {
    console.log('In comes a request from ' + request.method + ' to ' + request.url);
    next();
})

/*app.use(function (request, response, next) {
   var minute = (new Date()).getMinutes();
   if (minute % 2) {
       next();
   } else {
       response.statusCode = 403;
       response.end('Not authorized!');
   }
});*/

app.get('/user/:name', function (request, response) {
    response.end('This is user with name param: ' + request.params.name);
});

app.get('/', function (request, response) {
    response.render('index', {
        message: 'Hey everyone! this is our view'
    });
});

app.get('/about', function (request, response) {
    response.end('This is page about this project');
});

app.use(function (request, response) {
    response.statusCode = 404;
    response.end("Page not found!");
});

http.createServer(app).listen(3000);