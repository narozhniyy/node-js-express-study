const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('book', ItemSchema);
