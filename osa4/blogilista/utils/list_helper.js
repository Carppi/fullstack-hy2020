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

const mostBlogs = (blogs) => {

  const authorArray = blogs.map(blog => blog.author)
  //console.log('authorArray',authorArray)
  const mostActiveAuthor = _.chain(authorArray)
    .countBy()
    .toPairs()
    .max(_.last)
    .value()

  //console.log('mostActiveAuthor',mostActiveAuthor)

  if (blogs.length === 0) {
    return {
      author: 'no blogs available',
      blogs: 0
    }
  } else {
    return {
      author: _.first(mostActiveAuthor),
      blogs: _.last(mostActiveAuthor)
    }
  }
  

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}