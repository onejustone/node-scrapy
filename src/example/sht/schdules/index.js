// https://github.com/node-schedule/node-schedule

// 根据 schedule.RecurrenceRule 定义可重复执行的 schedule 规则

// second(0 - 59)
// minute(0 - 59)
// hour(0 - 23)
// date(1 - 31)
// month(0 - 11)
// year
// dayOfWeek(0 - 6) Starting with Sunday

const schedule = require('node-schedule')

const rules = [
  { scheduleId: '0', text: '测试', rule: { startTime: new Date(Date.now()) }, minute: 5},
  { scheduleId: '1', text: '每天22:30', rule: { minute: 5, hour: 20 } },
  { scheduleId: '2', text: '星期五下午18：30', rule: { minute: 30, hour: 18, dayOfWeek: 5 } },
  { scheduleId: '3', text: '星期五下午20：30', rule: { minute: 30, hour: 20, dayOfWeek: 5 } },
  { scheduleId: '4', text: '星期五下午23：00', rule: { hour: 23, dayOfWeek: 5 } },
  { scheduleId: '5', text: '星期六早上10：00', rule: { hour: 10, dayOfWeek: 6 } },
  { scheduleId: '6', text: '星期六下午18：30', rule: { minute: 30, hour: 18, dayOfWeek: 6 } },
  { scheduleId: '7', text: '星期六下午20：30', rule: { minute: 30, hour: 20, dayOfWeek: 6 } },
]

// rule example

// const recurrenceRule1 = new schedule.RecurrenceRule()
// recurrenceRule1.second = 1

// const recurrenceRule2 = new schedule.RecurrenceRule()
// recurrenceRule2.second = 2

// const rules = [
//   { title: '第一秒', rule: recurrenceRule1 },
//   { title: '第三秒', rule: recurrenceRule2 },
// ]

function start(fn, callback) {
  for (const scheduleItem of rules) {
    new schedule.scheduleJob(scheduleItem.rule, function (runTime) {
      console.log(`${scheduleItem.text}: ${runTime}`)
      fn() && callback(scheduleItem, runTime)
    })
  }
}

module.exports = start
