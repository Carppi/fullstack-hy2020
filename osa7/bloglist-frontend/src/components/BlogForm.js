import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from '../components/Togglable'
import { createBlog } from '../reducers/blogReducer'

import {
  Button,
  TextField
} from '@material-ui/core'

const BlogForm = () => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogFormSection = () => (
    <div>
      <h3>Create a new blog</h3>
      <Togglable showButtonId="show-blog-form-button" buttonLabel="new blog" ref={blogFormRef}>
        {blogForm()}
      </Togglable>
    </div>
  )

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    dispatch(createBlog(blogObject))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const blogForm = () => (
    <form onSubmit={addBlog} className='blogForm'>
      <div>
        <TextField
          label='title'
          id='title'
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          label='author'
          id='author'
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          label='url'
          id='url'
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <Button
        id="submit-blog-button"
        type="submit"
        variant="contained"
        color="primary"
      >
        save
      </Button>
    </form>
  )

  return blogFormSection()

}

export default BlogForm