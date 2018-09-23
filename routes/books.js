var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books.js');
//var db = require('../config/db.js');
var exception = function (err) {
    if (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};

router.use('/', function (req, res, next) {
    console.log('Start here /book');
    next();
});

router.get('/', booksController.all);

router.get('/:id', booksController.findById);

router.post('/', function (req, res) {
    var collection = db.get().collection('books');
    var book = {
        title: req.body.title
    };
    collection.insertOne(book, function (err, result) {
        exception(err);
        res.send(result);
    });
});

router.put('/:id', booksController.updateById);

router.delete('/:id', booksController.deleteById);

module.exports = router;