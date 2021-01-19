const Blog = require('../models/blog')
const User = require('../models/user')

//pohjautuu dummy.test.js tiedoston blogeihin, joista valittu kolme ensimmäistä
const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }
]

const newBlogs = [
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const blogWithNoLikes =
{
  title: "Blog with no likes",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
}

const blogWithNoTitle =
{
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2
}

const blogWithNoUrl =
{
  title: "Type wars",
  author: "Robert C. Martin",
  likes: 2
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = () => {
  const userTable = []
  const user1 = new User({ username: 'root', name: 'Superuser', password: 'sekret' })
  const user2 = new User({ username: 'user2', name: 'User 2', password: 'salasana' })
  userTable.push(user1,user2)
  return userTable
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getFirstUserId = async () => {
  const users = await usersInDb()
  const firstUser = await users[0]
  return await firstUser.id
}

module.exports = {
  initialBlogs,
  newBlogs,
  blogWithNoLikes,
  blogWithNoTitle,
  blogWithNoUrl,
  blogsInDb,
  initialUsers,
  getFirstUserId,
  usersInDb
}