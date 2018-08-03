const puppeteer = require('puppeteer')

const mongoose = require('mongoose')
const User = require('./models/user')

const TARGET_URI = `http://chuxin.360jlb.cn/user?id=3618365`

async function start (params) {
  let browser = null
  let page = null

  try {
    browser = await puppeteer.launch({
      headless: false
    })
  } catch (error) {
    console.error(error)
  }
}

start()
