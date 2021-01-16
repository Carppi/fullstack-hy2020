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
  const authorWithMostBlogs = _.chain(authorArray)
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
      author: _.first(authorWithMostBlogs),
      blogs: _.last(authorWithMostBlogs)
    }
  }


}

// pohjautuu https://stackoverflow.com/questions/38774763/using-lodash-to-sum-values-by-key/38774930
const mostLikes = (blogs) => {

  const blogsByAuthor = _(blogs)
    .groupBy('author')
    .map((objects, key) => ({
      author: key,
      likes: _.sumBy(objects, 'likes')
    }))
    .maxBy('likes')

  //console.log('blogsByAuthor: ',blogsByAuthor)

  if (blogs.length === 0) {
    return {
      author: 'no authors / blogs available',
      likes: 0
    }
  } else {
    return blogsByAuthor
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}