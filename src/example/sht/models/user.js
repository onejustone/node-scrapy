const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  crawledURL: String,
  targetURL: String,
  nickname: String,
  targetId: String,
  feedItems: Array,
  crawledDate: Date
}, { strict: false })

module.exports = mongoose.model('User', userSchema)
