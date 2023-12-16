const listHelper = require('../utils/list_helper')
const lodash = require('lodash')

const fakeBlog = {
  "title": "blogii testi!",
  "author": "Juha Siitonen",
  "url": "www.iltalehti.fi",
  "likes": "6"
}
const fakeBlog2 = {
  "title": "blogi testi!",
  "author": "Juho Siitonen",
  "url": "www.iltalehti.fi",
  "likes": "5"
}

const fakeList = []
fakeList.push(fakeBlog)
fakeList.push(fakeBlog2)

const fakelist2 = []
fakelist2.push(fakeBlog)


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('likes', () => {
    
  test('of one is equal to the value itself', () => {
    expect(listHelper.totalLikes(fakelist2)).toBe(6)
  })
  test('of zero is equal to zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('of three blogs is correct', () => {
    expect(listHelper.totalLikes(fakeList)).toBe(17)
  })
})

describe('Max likes', () => {

  test('of one blog is its own likes', () => {
    expect(listHelper.favoriteBlog(fakeList)).toEqual(fakeBlog)
  })
})


describe('Most Blogs', () => {
    
    fakeList.push(fakeBlog)

    test('most blogs written by', () => {
       const result = listHelper.mostBlogs(fakeList)
        expect(result.blogs).toBe(2)
      })
    })

describe('Most likes on a blog', () => {

  test('most likes should be twelwe', () => {
    const result = listHelper.mostLikes(fakeList)
    expect(result.likes).toBe(12)

  })
})
    
