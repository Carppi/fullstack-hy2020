const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some notes saved', () => {
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
  describe('addition of a new blog (HTTP POST request to /api/blogs)', () => {

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

    test('if no value of likes is given, return 0', async () => {
      const newBlog = helper.blogWithNoLikes

      await api
        .post('/api/blogs')
        .send(newBlog)

      const response = await api.get('/api/blogs')

      const addedBlog = _.findLast(response.body, { 'title': 'Blog with no likes' })

      expect(addedBlog.likes).toBeDefined()
      expect(addedBlog.likes).toEqual(0)
    })

    test('if no value of title is given, return 400 Bad request', async () => {
      const newBlog = helper.blogWithNoTitle

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    })

    test('if no value of url is given, return 400 Bad request', async () => {
      const newBlog = helper.blogWithNoUrl

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    })

  })

  describe('deletion of a blog', () => {
    test('succeeds with a status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      
      const blogTitlesAtEnd = blogsAtEnd
        .map(r => r.title)

      expect(blogTitlesAtEnd).not.toContain(blogToDelete.title)

    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})

/* Tee supertest-kirjastolla testit blogilistan osoitteeseen
/api/blogs tapahtuvalle HTTP GET -pyynnölle.
Testaa, että sovellus palauttaa oikean määrän
JSON-muotoisia blogeja. */