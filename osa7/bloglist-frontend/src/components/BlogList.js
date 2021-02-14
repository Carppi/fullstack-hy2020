import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { List, ListItem, ListItemText } from '@material-ui/core'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div className='blog-list'>
      <h3>List of blogs</h3>
      <List>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <ListItem key={blog.id} component={Link} to={`/blogs/${blog.id}`}>
              <ListItemText
                primary={blog.title}
                secondary={`by ${blog.author}`}
              />
            </ListItem>
          )}
      </List>
    </div>
  )
}

export default BlogList
