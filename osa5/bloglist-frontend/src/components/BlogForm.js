import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
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
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm