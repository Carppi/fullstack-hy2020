const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const blog = new Blog(request.body)

  if (blog.title && blog.url) { //if the blog has not been defined correctly return 

    if (!blog.likes) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).json({
      error: 'title or url missing'
    })
  }


})

module.exports = blogsRouter