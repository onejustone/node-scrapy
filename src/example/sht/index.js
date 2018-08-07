
const logger = require('../../util/logger')

const launchUserCrawler = require('./crawler')
const { insertUserInfo } = require('./cotroller/user')

const CRAWLED_URL = `http://chuxin.360jlb.cn`
const TARGET_ID = '3618365'
const TARGET_URI = `${CRAWLED_URL}/user?id=${TARGET_ID}`

async function start(params) {
    let userInfo = {}

    try {
      userInfo = await launchUserCrawler(TARGET_URI, { headless: true }/* { nickname, feedItems}*/)
      logger.info('Get user info successfully!', userInfo.name)
    } catch (error) {
      logger.error(`Error launchUserCrawler:${error}`)
      throw Error(error)
    }

    userInfo = Object.assign({}, userInfo, {
      crawledURL: CRAWLED_URL,
      targetURL: TARGET_URI,
      crawledDate: new Date(),
      targetId: TARGET_ID
    })

    try {
      await insertUserInfo(userInfo)
    } catch (error) {
      logger.error(`[Error insertUserInfo]: ${error}`)
      throw Error(error)
    }
}

start()
