import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {
  /*case 'LIKE':

      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )*/

  case 'NEW_BLOG':
    return state.concat(action.data)

  case 'INIT_BLOGS':
    return action.data

  default: return state
  }

}

/*export const likeTo = (blog) => {
  return async dispatch => {

    const changedBlog = await blogService
      .update(blog.id, { ...blog, likes: blog.likes + 1 })

    dispatch({
      type: 'LIKE',
      data: { ...changedBlog }
    })
  }
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

export const createBlog = ({ blogObject, showNotification }) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      showNotification(
        'A new blog "' + newBlog.title + '" by ' + newBlog.author + ' added',
        true
      )
    } catch (exception) {
      showNotification(
        'Adding a new blog failed due to the following error: ' + exception,
        false
      )
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