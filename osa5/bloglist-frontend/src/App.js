import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, positive) => {
    setNotification({ message: message, positive: positive })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showNotification(
          'A new blog "' + returnedBlog.title + '" by ' + returnedBlog.author + ' added',
          true
        )
      })
      .catch(error => {
        showNotification(
          'Adding a new blog failed due to the following error: ' + error,
          false
        )
      })
  }

  const likeBlog = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const filteredBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogService
      .update(id, filteredBlog)
      .then(() => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
      .catch(() => {
        showNotification('Error in liking the blog', false)
      })
  }

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      showNotification('login succeeded', true)
    } catch (exception) {
      showNotification('wrong username or password', false)
    }
  }

  const loginForm = () => (
    <LoginForm
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <div>
      <h3>Create a new blog</h3>
      <Togglable showButtonId="show-blog-form-button" buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    </div>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    showNotification('User logged out', true)
  }

  const removeBlog = (id) => {
    blogService.deleteBlog(id)
    setBlogs(blogs.filter(p => p.id !== id))
    showNotification(`${blogs.find(n => n.id === id).title} deleted`, true)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        <>
          <p>{user.name} logged in</p> <button type="button" onClick={logOut}>logout</button>
          {blogForm()}
          <BlogList
            blogs={blogs}
            likeBlog={likeBlog}
            user={user}
            removeBlog={removeBlog}
          />
        </>
      }
    </div>
  )
}

export default App