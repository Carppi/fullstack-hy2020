import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  const user = useSelector(state => state.user)
  const [showAll, setShowAll] = useState(false)
  const dispatch = useDispatch()

  const deleteBlog = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(removeBlog(blog))
    }
  }

  const createdByUser = user.username === blog.user.username
  return (
    <div className='blog'>
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setShowAll(!showAll)} className='viewButton'>
          {showAll ? 'hide' : 'view'}
        </button>
      </div>

      {showAll ?
        <>
          <ul>
            <li>Url: {blog.url}</li>
            <li>Likes: {blog.likes}
              <button
                onClick={() => dispatch(likeBlog(blog))}
                className="likeButton"
              >
                like
              </button>
            </li>
            <li>User: {blog.user.name}</li>
          </ul>
          {createdByUser ? <button className="deleteButton" onClick={() => deleteBlog()}>remove</button> : <></>}
        </> :
        <></>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
