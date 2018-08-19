const logger = require('../../util/logger')
const User = require('./models/user')

const launchUserCrawler = require('./crawler')
const { generateTargetUrls } = require('./targetUrls')

const { connectDB, insertUserInfo } = require('./cotroller/user')

const sendMail = require('./mail')

async function start(target) {
    let userInfo = {}

    try {
      // 启动脚本
      logger.info('Start Get user info...')
      userInfo = await launchUserCrawler(
        target.TARGET_URI,
        { headless: true }/* { nickname, feedItems}*/
      )
      logger.info('Get user info successfully!', userInfo)
    } catch (error) {
      logger.error(`Error launchUserCrawler: ${error}`)
      throw Error(error)
    }

    // 组装目标信息
    userInfo = Object.assign({}, userInfo, {
      crawledURL: target.CRAWLED_URL,
      targetURL: target.TARGET_URI,
      crawledDate: new Date(),
      targetId: target.TARGET_ID
    })

    try {
      // 打开数据库连接
      await connectDB()

      // 根据 targetURL 判断目标是否已近存在
      const oldUser = await User.findOne({ targetURL: userInfo.targetURL})
      if (!oldUser) {
        // 不存在则进行 insert 操作
        logger.info('oldUser is not exit now insert it to db')
        await insertUserInfo(userInfo)
      } else {
        // 如果目标有新的活动更新
        if (oldUser.feedItems.length === userInfo.feedItems.length) {
          logger.info('目标目前没有任何动态更新！')
          return
        }

        // 发送邮件通知
        await sendMail(userInfo)

        // 更新目标信息
        await insertUserInfo(userInfo)
      }

    } catch (error) {
      logger.error(`[Error insertUserInfo]: ${error}`)
      throw Error(error)
    }
}

function autoUpdate() {
  const targetList = generateTargetUrls()

  let timer = null
  timer = setInterval(async () => {
   for (target of targetList) {
      await start(target)
    }
  }, 10000)
}

autoUpdate()
