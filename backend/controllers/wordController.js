const Word = require('../models/Word');

exports.getWordsForDay = async (req, res) => {
  const day = req.params.day;

  try {
    const words = await Word.find({ day: day });
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching words' });
  }
};
