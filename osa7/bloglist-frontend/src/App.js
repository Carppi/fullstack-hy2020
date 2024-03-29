import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch, Route, useRouteMatch, Link
} from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

import { Container, AppBar, Toolbar, Button } from '@material-ui/core'
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

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogId = blogMatch
    ? blogMatch.params.id
    : null

  const LoggedIn = ({ user }) => {

    return (
      <>
        <Button color="inherit" className="logoutButton" type="button" onClick={logOut}>logout</Button>
        ({user.name} logged in)
      </>
    )
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">blogs</Button>
          <Button color="inherit" component={Link} to="/users">users</Button>
          {user === null
            ? <></>
            : <LoggedIn user={user}></LoggedIn>
          }
        </Toolbar>
      </AppBar>
      <h2>Blog app</h2>
      <Notification />
      {user === null
        ? <LoginForm handleSubmit={handleLogin} />
        : <>
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <Blog id={blogId} />
            </Route>
            <Route path="/">
              <BlogView />
            </Route>
          </Switch>
        </>
      }
    </Container>
  )
}

export default App