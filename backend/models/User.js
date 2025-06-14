const mongoose = require('mongoose'); 
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  }, { collection: 'users' }); // Explicit collection name
  
  module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);