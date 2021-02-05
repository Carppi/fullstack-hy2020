import React, { useState } from 'react'

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
}

export default BlogForm