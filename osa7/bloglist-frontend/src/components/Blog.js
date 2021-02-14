import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ id }) => {

  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

  const dispatch = useDispatch()

  const deleteBlog = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(removeBlog(blog))
    }
  }

  if (!blog) {
    return null
  }

  const createdByUser = user.username === blog.user.username
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <>
        <ul>
          <li>Url: <a href={blog.url}>{blog.url}</a></li>
          <li>Likes: {blog.likes}
            <button
              onClick={() => dispatch(likeBlog(blog))}
              className="likeButton"
            >
              like
            </button>
          </li>
          <li>Added by: {blog.user.name}</li>
        </ul>
        {createdByUser ? <button className="deleteButton" onClick={() => deleteBlog()}>remove</button> : <></>}
      </>
    </div>
  )
}

export default Blog
