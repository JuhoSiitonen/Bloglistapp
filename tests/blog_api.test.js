const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: "blogi testi!",
    author: "Juho Siitonen",
    url: "www.iltalehti.fi",
    likes: "5"
  },
  {
    title: "blogi testi2",
    author: "Juha Siitonen",
    url: "www.iltalehti.fi/fullstack",
    likes: "6"
  },
]



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


describe('GET Blogs', () => {
  test('two blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are identified with an ID', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
  })
})

describe('POST Blogs', () => {

    test('new blog is added, and received', async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'testi', passwordHash })

      await user.save()
      const testUser = await User.findOne(user)
      const userForToken = {
        username: testUser.username,
        id: testUser._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      const tokenBearer = 'Bearer ' + token
      const newBlog = 
            {
                title: "blogi testi!",
                author: "Juho Siitonen",
                url: "www.iltalehti.fi",
                likes: "5",
                userId: userForToken.id
             }
      const res = await api
        .post('/api/blogs')
        .set('Authorization', tokenBearer)
        .send(newBlog)
      newBlog.id = res.body.id
      expect(res.body.title).toEqual(newBlog.title)
    })

    test('new blog is added, and counted', async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'testi', passwordHash })

      await user.save()
      const testUser = await User.findOne(user)
      const userForToken = {
        username: testUser.username,
        id: testUser._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      const tokenBearer = 'Bearer ' + token
      const newBlog = 
            {
                title: "blogi testi!",
                author: "Juho Siitonen",
                url: "www.iltalehti.fi",
                likes: "5",
                userId: userForToken.id
             }  
        const res = await api
          .post('/api/blogs')
          .set('Authorization', tokenBearer)
          .send(newBlog)
        
        const allBlogs = await api.get('/api/blogs')
        expect(allBlogs.body).toHaveLength(initialBlogs.length +1)
    })

    test('new blog doesnt have likes', async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'testi', passwordHash })

      await user.save()
      const testUser = await User.findOne(user)
      const userForToken = {
        username: testUser.username,
        id: testUser._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      const tokenBearer = 'Bearer ' + token
      const newBlog = 
            {
                title: "blogi testi!",
                author: "Juho Siitonen",
                url: "www.iltalehti.fi",
                userId: userForToken.id
             }
        const res = await api
          .post('/api/blogs')
          .set('Authorization', tokenBearer)
          .send(newBlog)
        expect(res.body.likes).toEqual(0)
    })

    test('new blog doesnt have title', async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'testi', passwordHash })
      await user.save()
      const testUser = await User.findOne(user)
      const userForToken = {
        username: testUser.username,
        id: testUser._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      const tokenBearer = 'Bearer ' + token
      const newBlog = 
            {
                author: "Juho Siitonen",
                url: "www.iltalehti.fi",
                likes: "5",
                userId: userForToken.id
             }
        await api
          .post('/api/blogs')
          .set('Authorization', tokenBearer)
          .send(newBlog)
          .expect(400)
    })

    test('new blog doesnt have url', async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'testi', passwordHash })
      await user.save()
      const testUser = await User.findOne(user)
      const userForToken = {
        username: testUser.username,
        id: testUser._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      const tokenBearer = 'Bearer ' + token
      const newBlog = 
            {
                title: "blogi testi!",
                author: "Juho Siitonen",
                likes: "5",
                userId: userForToken.id
             }
        await api
            .post('/api/blogs')
            .set('Authorization', tokenBearer)
            .send(newBlog)
            .expect(400)
    })
    test('new blog doesnt have token', async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'testi', passwordHash })
      await user.save()
      const testUser = await User.findOne(user)
      const userForToken = {
        username: testUser.username,
        id: testUser._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      const tokenBearer = 'Bearer ' + token
      const newBlog = 
            {
                title: "blogi testi!",
                author: "Juho Siitonen",
                url: "testisivu.fi",
                likes: "5",
                userId: userForToken.id
             }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('DELETE tests', () => {
    test('deletion returns status 204', async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'testi', passwordHash })
      await user.save()
      const testUser = await User.findOne(user)
      const userForToken = {
        username: testUser.username,
        id: testUser._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      const tokenBearer = 'Bearer ' + token
      const newBlog = 
            {
                title: "blogi testi!",
                author: "Juho Siitonen",
                url: "www.iltalehti.fi",
                likes: "5",
                userId: userForToken.id
             }
        await Blog.deleteMany({})
        await api
             .post('/api/blogs')
             .set('Authorization', tokenBearer)
             .send(newBlog)
        const allBlogs = await api.get('/api/blogs')
        const idToDelete = allBlogs.body[0].id
        await api
          .delete(`/api/blogs/${idToDelete}`)
          .set('Authorization', tokenBearer)
          .expect(204)
    })

    test('deletion actually removes one blog', async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'testi', passwordHash })
      await user.save()
      const testUser = await User.findOne(user)
      const userForToken = {
        username: testUser.username,
        id: testUser._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      const tokenBearer = 'Bearer ' + token
      const newBlog = 
            {
                title: "blogi testi!",
                author: "Juho Siitonen",
                url: "www.iltalehti.fi",
                likes: "5",
                userId: userForToken.id
             }
        await Blog.deleteMany({})
        await api
             .post('/api/blogs')
             .set('Authorization', tokenBearer)
             .send(newBlog)  
        const allBlogs = await api.get('/api/blogs')
        const idToDelete = allBlogs.body[0].id
        await api
          .delete(`/api/blogs/${idToDelete}`)
        const updatedBlogs = await api.get('/api/blogs')
        expect(updatedBlogs.body).toHaveLength(1)
    })
})

describe('PUT tests', () => {
    test('updating with valid data is succesfull', async () => {
        const allBlogs = await api.get('/api/blogs')
        const idToUpdate = allBlogs.body[0].id
        const updatedBlog =  {
            title: "blogi testi paivitys",
            author: "Juho Siitonen",
            url: "www.iltalehti.fi",
            likes: "6"
          }
        await api
          .put(`/api/blogs/${idToUpdate}`)
          .send(updatedBlog)
          .expect(200)
    })

    test('updating with invalid data is unsuccesfull', async () => {
        const allBlogs = await api.get('/api/blogs')
        const idToUpdate = allBlogs.body[0].id
        const updatedBlog =  {
            title: "",
            author: "Juho Siitonen",
            url: "",
            likes: "6"
          }
        const res = await api
          .put(`/api/blogs/${idToUpdate}`)
          .send(updatedBlog)
        expect(res.status).toBe(400)
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})