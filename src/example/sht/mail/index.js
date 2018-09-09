const mailEngine = require('../../../mailEngine')
const logger = require('../../../util/logger')

/**
 *
 * @param {*} userInfo
/* {
  "_id" : ObjectId("5b703a04e2400b622e094a02"),
    "targetURL" : "http://chuxin.360jlb.cn/user?id=3618365",
    "crawledDate" : ISODate("2018-08-12T13:45:40.504Z"),
    "crawledURL" : "http://chuxin.360jlb.cn",
    "feedItems" : [
      {
        "activityName": "[07.22 周日] 开启你人生的第一次室内攀岩！",
        "activityTime": "2018/7/17",
        "activityUrl": "http://chuxin.360jlb.cn/event?id=126463"
      },
      {
        "activityName": "[06.30 周六]游泳+健身+撸串，端午节一场不能错过的夏日清凉盛宴！",
        "activityTime": "2018/6/30",
        "activityUrl": "http://chuxin.360jlb.cn/event?id=121815"
      },
      {
        "activityName": "[06.23 周六] 速度与激情9 疯狂卡丁车比赛 女司机快来",
        "activityTime": "2018/6/23",
        "activityUrl": "http://chuxin.360jlb.cn/event?id=122608"
      }
    ],
    "nickname" : " 质数的一",
    "targetId" : "3618365"
}
*/

async function sendMail(userInfo) {
  const latestFeed = userInfo.feedItems[0]
  if (!latestFeed) {
    logger.info('目标信息不存在，取消短信发送')
    return
  }

  const subject = `您关注的${userInfo.nickname}发布了的动态`
  const html = `
    <b>时间：${latestFeed.activityTime}</b></br>
    <span>主题：<a href="${latestFeed.activityUrl}">${latestFeed.activityName}</a><span>
  `
  const mailOptions = {
    subject,
    html
  }

  try {
    await mailEngine(mailOptions)
    logger.info('[Send mail successfully!]')
  } catch (error) {
    logger.error(`[Error at mail index]: ${error}`)
  }
}

module.exports = sendMail
