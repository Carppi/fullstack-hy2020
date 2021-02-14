import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

      dispatch(setNotification('login succeeded', true))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', false))
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setNotification('User logged out', true))
  }

  const removeBlog = (id) => {
    blogService.deleteBlog(id)
    setBlogs(blogs.filter(p => p.id !== id))
    dispatch(setNotification(`${blogs.find(n => n.id === id).title} deleted`, true))
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ?
        <LoginForm handleSubmit={handleLogin} /> :
        <>
          <p>{user.name} logged in</p> <button className="logoutButton" type="button" onClick={logOut}>logout</button>
          <BlogForm />
          <BlogList
            user={user}
            removeBlog={removeBlog}
          />
        </>
      }
    </div>
  )
}

export default App