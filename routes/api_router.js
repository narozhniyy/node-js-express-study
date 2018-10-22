var express = require('express'),
    api = express.Router(),
    path = require('path');

/*var publicPath = path.resolve(__dirname, 'static'),
    uploadPath = path.resolve(__dirname, 'upload');

api.use('/public', express.static(publicPath));
api.use('/upload', express.static(uploadPath));*/

api.get('/test', function(request, response){
   response.writeHead(200, {"Content-Type": "text/plain"});
   response.end('this is new route');
});

module.exports = api;