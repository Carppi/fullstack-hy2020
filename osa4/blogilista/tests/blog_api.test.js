const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved and two users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers())

    const firstUserId = await helper.getFirstUserId()
    //console.log('userId', firstUserId)

    await Blog.deleteMany({})
    const blogs = helper.initialBlogs
    //console.log('blogs',blogs)

    
    blogs.forEach((blog) => {
      blog.userId = firstUserId
    })

    //console.log('blogs',modifiedBlogs)

    await Blog.insertMany(blogs)
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

  describe('editing of a blog', () => {
    test('succeeds with adding one like to an existing entry with all inputs', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const likesAtStart = blogToUpdate.likes
      blogToUpdate.likes = likesAtStart + 1

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.find(blog => blog.id === blogToUpdate.id).likes)
        .toEqual(likesAtStart + 1)

    })

    test('succeeds with adding one like to an existing entry with id and likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const likesAtStart = blogToUpdate.likes

      const updatedBlog = {
        id: blogToUpdate.id,
        likes: likesAtStart + 1
      }

      await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.find(blog => blog.id === updatedBlog.id).likes)
        .toEqual(likesAtStart + 1)

    })

    test('wrong id returns 400 Bad request', async () => {

      const updatedBlog = {
        "id": "123456",
        "title": "New and very smart title",
        "likes": 100
      }

      await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
        .expect(400)
    })

  })

  describe('creation succeeds', () => {

    test('with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'tester',
        name: 'Teppo Testaaja',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

  })

  describe('creation fails with incorrect usernames:', () => {

    test('with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser55',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('too short username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'Us',
        name: 'New User',
        password: 'sabasd',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username`')
      expect(result.body.error).toContain('shorter than the minimum')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('no username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'New User',
        password: 'sabasd',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

  })

  describe('creation fails with incorrect passwords:', () => {

    test('too short password', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'User456',
        name: 'New User',
        password: 'sa',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password has to be min. 3 characters')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('no password', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'User456',
        name: 'New User',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password has to be min. 3 characters')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
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