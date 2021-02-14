import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from '../components/Togglable'
import { createBlog } from '../reducers/blogReducer'

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
        Title:
        <input
          id='title'
          type="text"
          value={newTitle}
          name="NewTitle"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          id='author'
          type="text"
          value={newAuthor}
          name="NewAuthor"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          id='url'
          type="text"
          value={newUrl}
          name="NewUrl"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button id="submit-blog-button" type="submit">save</button>
    </form>
  )

  return blogFormSection()

}

export default BlogForm