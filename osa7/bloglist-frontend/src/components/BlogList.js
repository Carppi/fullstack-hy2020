import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const BlogList = ({ user, removeBlog }) => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div className='blog-list'>
      <h3>List of blogs</h3>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            removeBlog={removeBlog}
          />
        )}
    </div>
  )
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default BlogList
