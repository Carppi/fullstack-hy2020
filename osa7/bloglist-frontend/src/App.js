import React, { useEffect } from 'react'
import { useSelector ,useDispatch } from 'react-redux'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))

      dispatch(setNotification('login succeeded', true))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', false))
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
    dispatch(setNotification('User logged out', true))
  }

  const user = useSelector(state => state.user)

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ?
        <LoginForm handleSubmit={handleLogin} /> :
        <>
          <p>{user.name} logged in</p> <button className="logoutButton" type="button" onClick={logOut}>logout</button>
          <BlogForm />
          <BlogList />
        </>
      }
    </div>
  )
}

export default App