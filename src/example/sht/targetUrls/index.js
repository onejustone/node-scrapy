const fs = require('fs')
const path = require('path')
const logger = require('../../../util/logger')

const webList = [
  'http://jzbl.360jlb.cn',
  'http://chuxin.360jlb.cn'
]

const userList = [
  '3618365',
  '3637725',
  '3621264'
]

function generateTargetUrls() {
  const list = []

  webList.forEach(item => {
    userList.forEach(userId => {
      list.push({
        CRAWLED_URL: item,
        TARGET_ID: userId,
        TARGET_URI: `${item}/user?id=${userId}`
      })
    })
  })

  list.forEach(item => { console.log(item)})
  logger.info(`[ Targe urls is${list}]`)
  return list
  // fs.existsSync()
}

// generateTargetUrls()
module.exports = {
  generateTargetUrls
}
