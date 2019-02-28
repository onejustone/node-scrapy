const puppeteer = require('puppeteer')
const logger = require('../../util/logger')

/**
 * getUserInfo
 * @param { } page
 * @return {*} { nickname, feedItems }
 */
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
          const activityUrl = item.querySelector('.content > a').href || ''
          const activityName = item.querySelector('.content > a').innerText || ''
          const activityTime = item.querySelector('.time').innerText || ''

          return {
            activityName,
            activityTime,
            activityUrl
          }
        })
        return {
          nickname,
          feedItems
        }
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

// 创建 browser 单例
let browserInstance = null
async function getSingleBrowser({
  headless = true
} = {}) {
  if (browserInstance) return browserInstance
  logger.info('First lanuch singleton browser...')
  browserInstance = await puppeteer.launch({
    headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  logger.info('Lanuch singleton browser successfully!')
  return browserInstance
}

// 创建 page 单例
// let pageInstance = null
async function getSinglePage(browser) {
  // if (pageInstance) return pageInstance
  let pageInstance = null
  logger.info('Initing singleton newPage...')
  pageInstance = await browser.newPage()
  logger.info('Singleton page inited successfully!')
  await pageInstance.setViewport({
    width: 800,
    height: 800
  })
  return pageInstance
}

async function launchUserCrawler(TARGET_URI, browserOptions) {
  let browser = null
  let page = null

  try {
    browser = await getSingleBrowser(browserOptions)
    page = await getSinglePage(browser)
    await page.goto(TARGET_URI)

    // 确保页面加载完成
    await page.waitFor(1 * 1000)
    // 获取 user info
    const userInfo = await getUserInfo(page)
    await page.close()
    return userInfo
  } catch (error) {
    logger.error(error)
    throw Error(error)
  }
}

module.exports = launchUserCrawler
