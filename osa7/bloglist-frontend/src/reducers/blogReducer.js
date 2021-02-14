import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {

  switch (action.type) {
    case 'LIKE':

      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )

    case 'NEW_BLOG':
      return state.concat(action.data)

    case 'INIT_BLOGS':
      return action.data

    default: return state
  }

}

export const likeBlog = ({ blog }) => {
  return async dispatch => {

    try {

      const changedBlog = await blogService
        .update(blog.id, { ...blog, likes: blog.likes + 1 })

      dispatch({
        type: 'LIKE',
        data: { ...changedBlog }
      })
    } catch (exception) {
      dispatch(setNotification('Error in liking the blog', false))
    }

  }
}

/*const likeBlog = (id) => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const filteredBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogService
      .update(id, filteredBlog)
      .then(() => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
      .catch(() => {
        showNotification('Error in liking the blog', false)
      })
  }*/

/*export const addBlog = (blogObject, showNotification) => {

  blogService
    .create(blogObject)
    .then(returnedBlog => {
      createBlog(returnedBlog)
      showNotification(
        'A new blog "' + returnedBlog.title + '" by ' + returnedBlog.author + ' added',
        true
      )
    })
    .catch(error => {
      showNotification(
        'Adding a new blog failed due to the following error: ' + error,
        false
      )
    })
}*/

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