require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI

/*if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}*/

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  MONGODB_URI,
  JWT_SECRET
}