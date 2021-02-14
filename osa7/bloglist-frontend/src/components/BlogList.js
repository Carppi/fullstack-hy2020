import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div className='blog-list'>
      <h3>List of blogs</h3>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <div key={blog.id} className='blog'>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        )}
    </div>
  )
}

export default BlogList
