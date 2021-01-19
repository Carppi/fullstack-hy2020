const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username:1, name:1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body
  //var blog = new Blog(body)
  
  const user = await User.findById(body.userId)
  //console.log('user',user,'is undefined?',user == undefined)
  
  const blog2 = new Blog({
    title: body.title === undefined ? false : body.title,
    author: body.author === undefined ? false : body.author,
    url: body.url === undefined ? false : body.url,
    likes: body.likes === undefined ? false : body.likes,
    user: user._id == undefined ? false : user._id
  })
  //console.log('blog2',blog2)

  var blog = blog2

  if (blog.title && blog.url) {

    if (!blog.likes) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    //console.log(savedBlog,savedBlog._id)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).json({
      error: 'title or url missing'
    })
  }


})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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