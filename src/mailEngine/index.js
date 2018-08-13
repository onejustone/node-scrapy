'use strict'
const nodemailer = require('nodemailer')
const smtpConfig = require('./credit')

const logger = require('../util/logger')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'QQ',
  port: 465,
  secureConnection: true,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: smtpConfig.user, // generated qq user
    pass: smtpConfig.pass // generated qq password
  }
})

async function sendMail({
  subject = '检测到有新的活动',
  text = '目标有新的活动',
  html = ''
} = {}) {
  try {
    await transporter.verify()

    // setup email data with unicode symbols
    let mailOptions = {
      from: smtpConfig.from, // sender address
      to: smtpConfig.to, // list of receivers
      subject, // Subject line
      text,  // plain text body
      html // html body
    }

    // send mail with defined transport object
    await transporter.sendMail(mailOptions)
  } catch (error) {
    logger.error(`Error SendMail:${error}`)
    throw Error(error)
  }
}

module.exports = sendMail
