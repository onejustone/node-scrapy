const puppeteer = require('puppeteer');

const URI = 'http://chuxin.360jlb.cn/user?id=3618365'
// const URI = 'https://www.baidu.com/'

const fuck = async function start () {
  let browser = null
  let page = null

  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(URI, { waitUntil: 'networkidle2' });
    // const html = await page.$eval('html', e => e.innerHTML)
    // console.log(html)
    const element = await page.evaluate((sel) => {
      return document.querySelector(sel).children.length
    }, '#feedlist')
    console.log(element)
    // console.log(feedListNodes, 'feedListNodes')
    // const feedListElemnts = Array.from(feedListNodes)
    // feedList.forEach(e => {
    //   console.log(e.innerHtml)
    // })
    // const feedElements = feedList.
    // const feedList = await page.evaluate(_ => {
    //   const list = document.querySelectorAll('feed-container')
    //   console.log(list)
    //   console.log('---------------------------------')
    //   return list
    // })
  } catch (e) {
    console.error(e)
  }
  browser.close();
}

fuck()
