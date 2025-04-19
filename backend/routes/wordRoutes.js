const express = require('express');
const router = express.Router();
const { getWordsForDay } = require('../controllers/wordController');

router.get('/:day', getWordsForDay);

module.exports = router;
