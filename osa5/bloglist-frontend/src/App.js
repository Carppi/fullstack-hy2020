import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username: 
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: 
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
          Title: 
          <input
            type="text"
            value={newTitle}
            name="NewTitle"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author: 
          <input
            type="text"
            value={newAuthor}
            name="NewAuthor"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          Url: 
          <input
            type="text"
            value={newUrl}
            name="NewUrl"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
      <button type="submit">save</button>
    </form>
  )

  const logOut = () => {
    //console.log('logging out')
    return window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p> <button type="button" onClick={logOut}>logout</button>
          <h2>Create new</h2>
          {blogForm()}
          <BlogList blogs={blogs} />
        </>
      }
    </div>
  )
}

export default App