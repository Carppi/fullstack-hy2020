import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const BlogList = ({ likeBlog, user, removeBlog }) => {

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
            likeBlog={likeBlog}
            user={user}
            removeBlog={removeBlog}
          />
        )}
    </div>
  )
}

BlogList.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default BlogList
