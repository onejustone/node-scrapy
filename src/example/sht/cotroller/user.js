const logger = require('../../../util/logger')
const mongoose = require('mongoose')
const dbConfig = require('../config/db.config')
const User = require('../models/user')

let dbInstance = null
async function connectDB() {
  try {
    if (dbInstance) return
    mongoose.connect(dbConfig.DB_URI, { useNewUrlParser: true })
    dbInstance = await mongoose.connection
    return dbInstance
    logger.info('Connected successfully!')
  } catch (error) {
    logger.error('Connect db error')
    throw Error(error)
  }
}

async function insertUserInfo(user) {
  try {
    await connectDB()
    logger.info(user, 'insertUserInfo')
    const newUser = await User.findOneAndUpdate({ targetURL: user.targetURL }, user, { upsert: true, new: true })
    logger.info('insertUserInfo', newUser)
    return newUser
  } catch (error) {
    logger.error(`Error insertUserInfo at controller js: ${error}`)
    throw Error(`Error insertUserInfo at controller js:', ${error}`)
  }
}

module.exports = {
  connectDB,
  insertUserInfo
}
