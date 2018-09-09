const schedule = require('node-schedule')

const recurrenceRule1 = new schedule.RecurrenceRule()
recurrenceRule1.second = 10

const recurrenceRule2 = new schedule.RecurrenceRule()
recurrenceRule2.second = 15

const startTime = new Date(Date.now())

const rules = [
  { title: '1', rule: { start: startTime, second: 0 }},
  { title: '2', rule: { second: 20 }},
  { title: '3', rule: { second: 30 }},
  { title: '4', rule: { second: 40 }},
  { title: '5', rule: { second: 50 }},
  { title: '第一秒', rule: recurrenceRule1 },
  { title: '第三秒', rule: recurrenceRule2 },
]

function start(fn, callback) {
  for (const scheduleItem of rules) {
    new schedule.scheduleJob(scheduleItem.rule, function (runTime) {
      fn() && callback(scheduleItem, runTime)
    })
  }
}

module.exports = start
