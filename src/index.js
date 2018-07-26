// import http from './rapi/http.js'
const dom = require('./mock/dom')
const cheerio = require('cheerio')

const $ = cheerio.load(dom)
// const URI = `http://chuxin.360jlb.cn/user?id=3618365`

// const result$ = http.get$(URI)

// result$.subscribe(data => {
//   // console.log(`${data}`)
//   const _ = cheerio.load(data)
//   const feedlist = _('#feedlist').innerHtml()
//   console.log(feedlist, 'feedlist')
// })

function start () {
  console.log($('#feedlist').contents().length)
}

module.exports.start
