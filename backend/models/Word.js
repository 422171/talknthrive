const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: String,
  pronunciation: String,
  day: Number
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
