const puppeteer = require('puppeteer')
const logger = require('../../util/logger')

async function getUserInfo(page) {
  const USER_NICKNAME_SELECTOR = '#layout-R > div.frame-right > div > div.body > div.user-info > ul > li.nickname'
  const FEED_LIST_SELECTOR = '#feedlist'
  const FEED_ITEM_SELECTOR = '.feed-item'

  try {
    const userInfo = await page.evaluate((sNickname, sFeedList, sFeedItem) => {
      const nickname = document.querySelector(sNickname)
        .innerText
        .split(':')[1]

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

    return userInfo
  } catch (error) {
    logger.error(error)
    throw Error(error)
  }
}

/**
 *
 * @param {*} TARGET_URI
 * @param {*} browserParams
 * @return {} {
      nickname,
      feedItems
    }
 */
async function launchUserCrawler(TARGET_URI, { headless = false } = {}) {
  let browser = null
  let page = null

  try {
    browser = await puppeteer.launch({ headless })
    page = await browser.newPage()

    await page.setViewport({ width: 800, height: 800 })
    await page.goto(TARGET_URI)

    // 确保页面加载完成
    await page.waitFor(1 * 1000)

    return await getUserInfo(page)
  } catch (error) {
    logger.error(error)
    throw Error(error)
  }
}

module.exports = launchUserCrawler
