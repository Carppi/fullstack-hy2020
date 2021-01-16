const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('HTTP GET request to /api/blogs', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned (i.e. blogcount is correct)', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )
  })

  test('blogs have a correct ID', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

})

/* 
Tee testi joka varmistaa että sovellukseen voi lisätä blogeja 
osoitteeseen /api/blogs tapahtuvalla HTTP POST -pyynnölle. 
Testaa ainakin, että blogien määrä kasvaa yhdellä. 
Voit myös varmistaa, että oikeansisältöinen blogi on lisätty järjestelmään. */
describe('HTTP POST request to /api/blogs', () => {

  test('a valid blog can be added', async () => {
    const newBlog = helper.newBlogs[0]

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'First class tests'
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})

/* Tee supertest-kirjastolla testit blogilistan osoitteeseen
/api/blogs tapahtuvalle HTTP GET -pyynnölle.
Testaa, että sovellus palauttaa oikean määrän
JSON-muotoisia blogeja. */