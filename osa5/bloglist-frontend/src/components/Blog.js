import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, user, removeBlog }) => {

  const [showAll, setShowAll] = useState(false)

  const deleteBlog = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      removeBlog(blog.id)
    }
  }

  const createdByUser = user.username === blog.user.username
  return (
    <div className='blog'>
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setShowAll(!showAll) } className='viewButton'>
          {showAll ? 'hide' : 'view'}
        </button>
      </div>

      {showAll ?
        <>
          <ul>
            <li>Url: {blog.url}</li>
            <li>Likes: {blog.likes} <button onClick={() => likeBlog(blog.id)}>like</button></li>
            <li>User: {blog.user.name}</li>
          </ul>
          {createdByUser ? <button onClick={() => deleteBlog()}>remove</button> : <></>}
        </> :
        <></>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func
}

export default Blog
