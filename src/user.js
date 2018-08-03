const logger = require('./util/logger')

async function run () {
  logger.info('成功启动')
  logger.error('启动失败了')
  try {
    // No need to `await` on this, mongoose 4 handles connection buffering
    // internally
    // mongoose.connect('mongodb://localhost:27017/thal', { useNewUrlParser: true })
    // await mongoose.connection;
    // console.log('Connected Successfully!')

    // User.create({
    //   name: 'chen rong',
    //   email: '807527097@qq.com',
    //   dateCrawled: new Date()
    // })
    // console.log('Save Successfully!')
    // const newUser = await User.find()
    // console.log(newUser)
  } catch (e) {
    console.error(e)
    // process.exit()
  }
}

run()
