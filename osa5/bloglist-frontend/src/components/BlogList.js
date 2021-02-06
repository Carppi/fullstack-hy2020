import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, user, removeBlog }) => {
  
  return (
    <div>
      <h3>List of blogs</h3>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            user={user}
            removeBlog={removeBlog}
          />
        )}
    </div>
  )
}

export default BlogList
