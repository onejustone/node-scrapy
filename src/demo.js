const schedule = require('./test')

function testInfo () {
  console.log('就啊哈，我是测试文件')
}

schedule(testInfo, (scheduleItem, runTime) => {
  console.log(scheduleItem, runTime)
})

module.exports = schedule
