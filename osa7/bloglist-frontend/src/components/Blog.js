import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog, createComment } from '../reducers/blogReducer'
//import BlogService from '../services/blogs'

const Blog = ({ id }) => {

  const [newComment, setNewComment] = useState('')
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

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment(blog.id, newComment))

    setNewComment('')
  }

  if (!blog) {
    return null
  }

  const createdByUser = user.username === blog.user.username

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
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
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input
          id='comment'
          type='text'
          value={newComment}
          name="NewComment"
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.text}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog
