const puppeteer = require('puppeteer')
const logger = require('../../util/logger')

const mongoose = require('mongoose')
const dbConfig = require('./config/db.config')
const User = require('./models/user')

const CRAWLED_URL = `http://chuxin.360jlb.cn`
const TARGET_ID = '3618365'
const TARGET_URI = `${CRAWLED_URL}/user?id=${TARGET_ID}`

async function getUserInfo(page) {
  const USER_NICKNAME_SELECTOR = '#layout-R > div.frame-right > div > div.body > div.user-info > ul > li.nickname'
  const FEED_LIST_SELECTOR = '#feedlist'
  const FEED_ITEM_SELECTOR = '.feed-item'

  try {
    const userInfo = await page.evaluate((sNickname, sFeedList, sFeedItem) => {
      const nickname = document.querySelector(sNickname)
        .innerText
        .split(':')[1]

      console.log(nickname, 'userNickname')
      const feedList = document.querySelector(sFeedList)
      if (!feedList) return []

      const items = feedList.querySelectorAll(sFeedItem)
      if (!items) return []

      const feedItems = Array.from(items).map(item => {
        const activityName = item.querySelector('.content > a').innerText
        const activityTime = item.querySelector('.time').innerText

        return {
          activityName,
          activityTime
        }
      })

      return { nickname, feedItems }
    },
      USER_NICKNAME_SELECTOR,
      FEED_LIST_SELECTOR,
      FEED_ITEM_SELECTOR
    )
    logger.info('userInfo', userInfo)
    return userInfo
  } catch (error) {
    logger.error(error)
    throw Error(error)
  }
}

async function connectDB () {
  try {
    mongoose.connect(dbConfig.DB_URI, { useNewUrlParser: true })
    await mongoose.connection
    logger.info('Connected successfully!')
  } catch (error) {
    logger.error('Connect db error')
    throw Error(error)
  }
}

async function insertUserInfoToDB (user) {
    try {
      logger.info('insertUserInfoToDB', user)
      await User.create(user)
    } catch (error) {
      logger.error(`Error insertUserInfoToDB: ${error}`)
      throw Error(`Error insertUserInfoToDB:', ${error}`)
    }
}

async function start (params) {
  let browser = null
  let page = null

  try {
    browser = await puppeteer.launch({
      headless: false
    })
    page = await browser.newPage()

    await page.setViewport({ width: 800, height: 800})
    await page.goto(TARGET_URI)
    // 确保页面加载完成
    await page.waitFor(1 * 1000)

    const { nickname, feedItems } = await getUserInfo(page)
    logger.info(nickname, 'nickname')
    logger.info(feedItems)

    await connectDB()
    const userInfo = {
      crawledURL: CRAWLED_URL,
      targetURL: TARGET_URI,
      targetName: nickname,
      targetId: TARGET_ID,
      feedItems,
      crawledDate: new Date()
    }

    try {
      await insertUserInfoToDB(userInfo)
      logger.info('insertUserInfoToDB successfully!')
    } catch (error) {
      logger.error(error)
      throw Error(error)
    }
  } catch (error) {
    console.error(error)
  }
}

start()
