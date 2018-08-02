const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  dateCrawled: Date
}, { strict: false })

module.exports = mongoose.model('User', userSchema)
