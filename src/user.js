const mongoose = require('mongoose')
const User = require('./models/user')

async function run () {
  try {
    // No need to `await` on this, mongoose 4 handles connection buffering
    // internally
    mongoose.connect('mongodb://localhost:27017/thal', { useNewUrlParser: true })
    await mongoose.connection;
    console.log('Connected Successfully!')

    User.create({
      name: 'chen rong',
      email: '807527097@qq.com',
      dateCrawled: new Date()
    })
    console.log('Save Successfully!')
    const newUser = await User.find()
    console.log(newUser)
  } catch (e) {
    console.error(e)
    process.exit()
  }
}

run()
