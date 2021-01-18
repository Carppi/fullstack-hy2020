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

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body

  const blog = {}

  //assign values only if they have been sent in the request
  if (body.likes) {blog.likes = body.likes}
  if (body.title) {blog.title = body.title}
  if (body.author) {blog.author = body.author}
  if (body.url) {blog.url = body.url}

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.json(updatedBlog)

})

module.exports = blogsRouter