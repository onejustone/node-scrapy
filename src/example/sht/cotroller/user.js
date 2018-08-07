const logger = require('../../../util/logger')
const mongoose = require('mongoose')
const dbConfig = require('../config/db.config')
const User = require('../models/user')

async function connectDB() {
  try {
    mongoose.connect(dbConfig.DB_URI, { useNewUrlParser: true })
    await mongoose.connection
    logger.info('Connected successfully!')
  } catch (error) {
    logger.error('Connect db error')
    throw Error(error)
  }
}

async function insertUserInfo(user) {
  try {
    await connectDB()
    await User.findOneAndUpdate({ targetURL: user.targetURL }, user, { upsert: true })
    logger.info('insertUserInfo', user)
  } catch (error) {
    logger.error(`Error insertUserInfo: ${error}`)
    throw Error(`Error insertUserInfo:', ${error}`)
  }
}

module.exports = {
  connectDB,
  insertUserInfo
}
