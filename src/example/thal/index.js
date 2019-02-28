const puppeteer = require('puppeteer')

// model
// const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const User = require('./models/user')

// auth
const CREDS = require('./config/creds')

const URI = 'https://github.com/login'

const USERNAME_SELECTOR = '#login_field'
const PASSWORD_SELECTOR = '#password'
const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block'

function generatrSearchUserURI (keyword, page) {
  return `https://github.com/search?p=${page}&q=${keyword}&type=Users`
}

async function connectDB () {
  const DB_URI = 'mongodb://localhost:27017/thal'
  try {
    mongoose.connect(DB_URI, { useNewUrlParser: true })
    await mongoose.connection
    console.log('Connected DB successfully!')
  } catch (error) {
    console.error(error)
  }
}

async function upsertUs(userObj) {
  try {
    // 如果邮箱存在，就更新实例，否则新增加
    const conditions = { email: userObj.email }
    const options = { upsert: true }
    const updateResult = await User.update(conditions, userObj, options)
    console.log('Upsert user successfully!')
    console.log(updateResult)
  } catch (err) {
    console.error(err)
  }
}

async function insertMultipleUser(users) {
  try {
    const insertResult = await User.insertMany(users)
    console.log(insertResult.insertCounted)
  } catch (error) {
    console.error(error)
    throw Error(error)
  }
}

async function getNumPages(page) {
  const NUM_USER_SELECTOR = '#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > div.d-flex.flex-column.flex-md-row.flex-justify-between.border-bottom.pb-3.position-relative > h3'

  const totalUser = await page.evaluate((sNum) => {
    const numElHTML = document.querySelector(sNum).innerHTML
    const total = parseInt(numElHTML.replace(/[^\d]/gi, ''))
    return total
  }, NUM_USER_SELECTOR)

  const pageSizes = Math.ceil(totalUser / 10)

  return pageSizes
}

async function run () {
  let browser = null
  let page = null

  try {
    await connectDB()
    browser = await puppeteer.launch({
      //  headless: false /*use chrome GUI*/
    })

    page = await browser.newPage()
    await page.setViewport({ width: 800, height: 800 })
    await page.goto(URI)

    // 模拟登录
    // page.click(USERNAME_SELECTOR)
    await page.type(USERNAME_SELECTOR, CREDS.username, { delay: 100 })

    // page.click(PASSWORD_SELECTOR)
    await page.type(PASSWORD_SELECTOR, CREDS.password, { delay: 100 })

    await page.click(BUTTON_SELECTOR)
    await page.waitForNavigation()

    // 先跳转到搜索页面
    const username = 'jack'
    await page.goto(generatrSearchUserURI(username, 1))
    await page.waitFor(1 * 1000)

    // 获取总的页数
    const totalPages = await getNumPages(page)
    console.log(totalPages, 'totalPages')

    // 定义提取用户信息的选择器： name, email
    const USER_LIST_ITEM_SELECTOR = '.user-list-item'
    const USER_NAME_SELECTOR = '.user-list-info>a:nth-child(1)'
    const USER_EMAIL_SELECTOR = '.user-list-info .user-list-meta .muted-link'

    const self = this
    const usersArray = []

    for (let pageIndex = 1; pageIndex <= 99; pageIndex ++) {
      console.log('all pages is', 99, 'current scrapy page is:', pageIndex)
      await page.goto(generatrSearchUserURI(username, pageIndex))

      const usersInfo = await page.evaluate((sInfo, sName, sEmail) => {
        let els = document.querySelectorAll(sInfo)
        els = Array.from(els)

        const usersInfo = els.map(item => {
          const $username = item.querySelector(sName).innerText
          const $useremail = item.querySelector(sEmail)
          const useremail = $useremail ? $useremail.innerText : undefined
          return {name: $username, email: useremail}
        })

        return usersInfo.filter(u => !!u.email)
      }, USER_LIST_ITEM_SELECTOR, USER_NAME_SELECTOR, USER_EMAIL_SELECTOR)

      usersArray.push(...usersInfo)
    }

    const startInsertTime = new Date()
    await insertMultipleUser(usersArray)
    const endInsertTime = new Date()
    console.log(startInsertTime, 'startInsertTime')
    console.log(endInsertTime, 'endInsertTime')
  } catch (e) {
    console.error(e)
  }
  // browser.close()
}

run()
