# 使用 nodemailer 发送邮件

## 运行要求

在当前目录下新建`credit.js`文件，配置相关信息：

```js
// ./credit.js
const smtpConfig = {
  user: 'test@qq.com', // 对应的 QQ 邮箱账号
  pass: 'xxx2299', // 此处不是 QQ 密码，而是 QQ 邮箱 smtp 授权码，具体百度
  from: 'from name" < text@qq.com>',
  to: 'toTest@gmail.com'
}

module.exports = smtpConfig
```

## reference

[nodemailer](https://nodemailer.com/smtp/)
[Node.js使用Nodemailer发送邮件](https://segmentfault.com/a/1190000012251328)
