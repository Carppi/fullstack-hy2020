import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

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

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired, 
  likeBlog: PropTypes.func.isRequired, 
  user: PropTypes.object.isRequired, 
  removeBlog: PropTypes.func.isRequired
}

export default BlogList
