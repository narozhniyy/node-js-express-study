var db = require('../config/db.config');
const mongoose = require('mongoose');
var ObjectID = mongoose.Schema.ObjectId;

exports.all = function (callback) {
    db.get().collection('books').find().toArray(function(err, docs) {
        callback(err, docs);
    });
};

exports.findById = function (id, callback) {
    db.get().collection('books').findOne({ _id: ObjectID(id) }, function (err, doc) {
        callback(err, doc);
    });
};

exports.updateById = function (id, title, callback) {
    db.get().collection('books').updateOne(
        { _id: ObjectID(id) },
        { title: title },
        function (err, result) {
            callback(err, result);
        }
    );
};

exports.deleteById = function (id, callback) {
    db.get().collection('books').deleteOne({ _id: ObjectID(id) }, function (err, result) {
        callback(err, result);
    });
};