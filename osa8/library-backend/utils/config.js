require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI

/*if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}*/

const JWT_SECRET = 'ASf&o9mXN$ThBGr6di97'

module.exports = {
  MONGODB_URI,
  JWT_SECRET
}