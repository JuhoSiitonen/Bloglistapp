const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const sum = (sum, item) => {
        return sum + item
    }
    return blogs.length === 0
    ? 0
    :blogs
      .map( blog => Number(blog.likes))
      .reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => Number(blog.likes))
    const max = Math.max(...likes)
    const obj = blogs.find( blog => Number(blog.likes) === max)
    return ({
        title: obj.title,
        author: obj.author,
        url: obj.url,
        likes: obj.likes
    })
}

const mostBlogs = (blogs) => {
  const numberOfBlogs = lodash
    .countBy(blogs, (blog => blog.author))
  let author = ""
  let maxBlogs = 0
  for (const [key, value] of Object.entries(numberOfBlogs)) {
    if (value > maxBlogs){
      maxBlogs = value
      author = key
    }
  }
  return ({
    author: author,
    blogs: maxBlogs
  })
}

const mostLikes = (blogs) => {
  const dubAuthors = blogs.map(blog => (blog.author.toString()))
  const authors = lodash.uniq(dubAuthors)
  let author = ""
  let maxLikes = 0
  for (let i=0; i < authors.length; i++) {
    const sum = (sum, item) => {
      return sum + item
    }
    const result = blogs
      .filter( (blog) => blog.author.toString() === authors[i])
      .map(blog => Number(blog.likes))
      .reduce(sum, 0)

    if (result > maxLikes) {
      author = authors[i]
      maxLikes = result
    }
  }
  return ({
    author: author,
    likes: maxLikes
  })

}

  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }