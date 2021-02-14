import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {

  switch (action.type) {
    case 'LIKE':

      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )

    case 'REMOVE_BLOG':
      return state.filter(b =>
        b.id !== action.data
      )

    case 'NEW_BLOG':
      return state.concat(action.data)

    case 'INIT_BLOGS':
      return action.data

    case 'NEW_COMMENT':
      return state.map(blog => {
        if (blog.id !== action.blogId) {
          return blog
        } else {
          blog.comments = blog.comments.concat(action.commentObject)
          return blog
        }
      })
    default: return state
  }

}

export const removeBlog = (blog) => {

  return async dispatch => {

    await blogService.deleteBlog(blog.id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id
    })

    dispatch(setNotification(`${blog.title} deleted`, true))
  }
}

export const likeBlog = (blog) => {

  const updatedBlog = { ...blog, likes: blog.likes + 1 }

  const changeUserToId = ({ user, ...rest }) => { //käytetty pohjana: https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83
    return (
      { ...rest, user: user.id }
    )
  }

  const changeCommentsToId = ({ comments, ...rest }) => {
    return (
      {
        ...rest,
        comments: comments.map(comment =>
          comment.id
        )
      }
    )
  }
  const filteredBlog = changeUserToId(updatedBlog)
  const filteredBlog2 = changeCommentsToId(filteredBlog)

  return async dispatch => {

    try {

      await blogService
        .update(blog.id, filteredBlog2)

      dispatch({
        type: 'LIKE',
        data: { ...updatedBlog }
      })
    } catch (exception) {
      dispatch(setNotification('Error in liking the blog', false))
    }

  }
}

export const createBlog = (blogObject) => {

  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatch(setNotification(
        'A new blog "' + newBlog.title + '" by ' + newBlog.author + ' added',
        true
      ))
    } catch (exception) {
      dispatch(setNotification(
        'Adding a new blog failed due to the following error: ' + exception,
        false
      ))
    }
  }
}

export const createComment = (blogId, commentText) => {
  const commentObject = { text: commentText }
  return async dispatch => {
    const savedComment = await blogService.createComment(blogId, commentObject)
    await dispatch({
      type: 'NEW_COMMENT',
      commentObject: savedComment,
      blogId
    })
  }

}

export const initializeBlogs = () => {

  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }

}

export default blogReducer