const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  //console.log('decodedToken', decodedToken)
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(body)

  if (!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  //console.log(savedBlog,savedBlog._id)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  //console.log('decodedToken', decodedToken)
  const user = await User.findById(decodedToken.id)

  //console.log('request.params.id', request.params.id)
  const blog = await Blog.findById(request.params.id)

  //console.log('user', user)
  //console.log('blog', blog)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'only own blogs can be deleted' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title === undefined ? false : body.title,
    author: body.author === undefined ? false : body.author,
    url: body.url === undefined ? false : body.url,
    likes: body.likes === undefined ? false : body.likes
  }
  //assign values only if they have been sent in the request


  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)

})

module.exports = blogsRouter