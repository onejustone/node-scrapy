const assert = require('assert')

const MongoClient = require('mongodb').MongoClient
const Long = require('mongodb').Long
const Decimal = require('mongodb').Decimal128

const User = require('./models/user')

const URI = 'mongodb://localhost:27017'
const DB_NAME = 'thal'

// async function upsertUser(userObj) {
//   try {
//     await MongoClient.connect(DB_URI, { useNewUrlParser: true })
//     // 如果邮箱存在，就更新实例，否则新增加
//     const conditions = { email: userObj.email }

//     const options = {
//       upsert: true,
//       new: true,
//       setDefaultsOnInsert: true
//     }

//     User.findOneAndUpdate(conditions, userObj, options, (err, result) => {
//       if (err) throw Error(err)
//     })
//   } catch (err) {
//     console.error(err)
//   }
// }

const users = [
  {
    name: '1',
    email: 'a@qq.com'
  },
  {
      name: '2',
      email: 'b@qq.com'
    },
  {
      name: '3',
      email: 'c@qq.com'
    },
  {
      name: '4',
      email: 'd@qq.com'
    },
  {
      name: '5',
      email: 'a@qq.com'
    },
  {
      name: '6',
      email: 'a@qq.com'
    },
]

// Insert a single document
async function insertSingleUser (db, user) {
  try {
    const r = await db.collection('users').insertOne(user)
    assert.equal(1, r.insertedCount)
    console.log('Inserted Successfully!')
  } catch (e) {
    console.error(e.stack)
    throw Error(e.stack)
  }
}

// Insert multiply document
async function insertMultipleUser(db, users) {
  try {
    const r = await db.collection('users').insertMany(users)
    assert.equal(users.length, r.insertedCount)
    console.log('Inserted Multiple user Successfully!')
  } catch (e) {
    console.error(e.stack)
    throw Error(e.stack)
  }
}

// Special a Date Type
async function insertSpecialDateType (db, user) {
  try {
    const r = await db.collection('users').insert(user)
    assert.equal(1, r.insertedCount)
    console.log('Insert special a data type successfuly!')
  } catch (e) {
    console.error(e.stack)
    throw Error(e.stack)
  }
}

// Update
// Updata a single docuemnt
async function updateSingle(collection, conditions, data, options) {
 try {
   const r = await collection.updateOne(conditions, data, options)
  //  assert.equal(1, r.matchedCount)
  //  assert.equal(1, r.modifiedCount)
 } catch (e) {
   console.error(e.stack)
   throw Error(e.stack)
 }
}

async function updateMultiple(collection, conditions, data, options) {
  try {
    const r = await collection.updateMany(conditions, data, options)
    //  assert.equal(1, r.matchedCount)
    //  assert.equal(1, r.modifiedCount)
  } catch (e) {
    console.error(e.stack)
    throw Error(e.stack)
  }
}

// Remove
// delete single
async function deleteSingle (collection, conditions) {
  try {
    const r = await collection.deleteOne(conditions)
    console.log(r.deletedCount)
  } catch (e) {
    console.error(e.stack)
    throw Error(e)
  }
}

// Delete multiple
async function deleteMultiple (collection, conditions) {
  try {
    const r = await collection.deleteMany(conditions)
    console.log(r.deletedCount)
  } catch (e) {
    console.error(e)
    throw Error(e.stack)
  }
}

async function start () {
  try {
    const client = await MongoClient.connect(URI, { useNewUrlParser: true })
    console.log('Connected correctly to server')
    const db = client.db(DB_NAME)
    console.log('Connect successfully to db')

    // await insertSingleUser(db, { name: 'jack', email: 'jack@qq.com' })
    // await insertMultipleUser(db, users)

    // const longValue = Long(1787)
    // const deciamlValue = Decimal.fromString('27.487835')

    // const specialDataTypeUser = {
    //   name: 'jan',
    //   email: 'jan@qq.com',
    //   friends: longValue,
    //   balance: deciamlValue
    // }

    // await insertSpecialDateType(db, specialDataTypeUser)
    const usersCollection = db.collection('users')
    const conditions = {
      name: '2'
    }
    // const data = { $set: { 'email': '123456' } }
    // const options = { upsert: true }
    // await updateSingle(usersCollection, conditions, data, options)
    // await updateMultiple(usersCollection, conditions, data)
    // await deleteSingle(usersCollection, conditions)
    await deleteMultiple(usersCollection, conditions)
    client.close()
  } catch (e) {
    console.error(e.stack)
    client.close()
  }
}

start()
