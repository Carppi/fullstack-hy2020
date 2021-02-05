import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {

  const [showAll, setShowAll] = useState(false)

  return (
    <div className="blog">
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view'}
        </button>
      </div>

      {showAll ?
        <ul>
          <li>Url: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={() => likeBlog(blog.id)}>like</button></li>
          <li>User: {blog.user.name}</li>
        </ul> :
        <></>}
    </div>
  )
}

export default Blog
