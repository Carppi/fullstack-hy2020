import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, user }) => {
  
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
          />
        )}
    </div>
  )
}

export default BlogList
