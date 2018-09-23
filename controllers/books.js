var Books = require('../services/book.js');

exports.all = function (req, res) {
	Books.all(function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		//res.send(docs);
		res.render("index", {books: docs});
	});
}

exports.findById = function (req, res) {
	Books.findById(req.params.id, function (err, doc) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(doc);
	});
}

exports.updateById = function (req, res) {
	Books.updateById(req.params.id, req.body.title, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(result);
	});
}

exports.deleteById = function (req, res) {
	Books.deleteById(req.params.id, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(result);
	});
}