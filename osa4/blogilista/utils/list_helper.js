const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, item) => sum + item

  return blogs.length === 0
    ? 0
    : blogs
      .map(blog => blog.likes)
      .reduce(reducer)

}

const favoriteBlog = (blogs) => {

  const favBlog = _.maxBy(blogs, 'likes')
  //console.log(favBlog,'blogs available:',blogs.length !== 0)
  
  if (blogs.length === 0) {
    return {
      title: 'no blogs available',
      author: 'no-one',
      likes: 0
    }
  } else {
    return {
      title: favBlog.title,
      author: favBlog.author,
      likes: favBlog.likes
    }
  }
      
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}