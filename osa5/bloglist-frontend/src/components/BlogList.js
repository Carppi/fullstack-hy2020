import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, likeBlog}) => (
  <div>
    <h3>List of blogs</h3>
    {blogs.map(blog =>
      <Blog 
      key={blog.id} 
      blog={blog} 
      likeBlog={likeBlog}
      />
    )}
  </div>
)

export default BlogList
