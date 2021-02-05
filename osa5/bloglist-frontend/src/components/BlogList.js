import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs}) => (
  <div>
    <h3>List of blogs</h3>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default BlogList
