var express = require('express'),
    http = require('http'),
    logger = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('short'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(function (err, request, response, next) {
    var filePath = path.join(__dirname, 'static', request.url);
    fs.stat(filePath, function (err, fileInfo) {
        if (err) {
            console.error(err);
            next(err);
        }

        if (fileInfo.isFile()) {
            response.sendFile(filePath)
        } else {
            next();
            console.log('we are in else');
        }
    })

});

app.get('/', function (request, response) {
    response.render('index', {
        message: 'You are on website, which will help you find a book.'
    });
});

var books = [];
app.locals.books = books;

app.get('/books', function (request, response) {
    response.render('book');
});

app.get('/book/add', function (request, response) {
   response.render('add-book');
});

app.post('/book/add', function (request, response) {

    if (!request.body.author || !request.body.title) {
        response.status(400).send('Book must have author and book title fields.');
        return;
    }

    books.push({
        author: request.body.author,
        title: request.body.title,
        date: new Date()
    });

    response.redirect('/books');
});

/*app.get('/user/:name', function (request, response) {
    response.end('This is user with name param: ' + request.params.name);
});*/

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

app.use(function (err, request, response, next) {
   response.statusCode = 500;
   response.end('Internal server error!');
});

/*app.use(function (request, response) {
    response.statusCode = 404;
    response.end("Page not found!");
});*/

http.createServer(app).listen(3000);