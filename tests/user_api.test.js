const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        username: "Juubamies",
        name: "Juho Siitonen",
        password: "Fullstackopen2023",
    },
    {
        username: "Testimies",
        name: "Juha Siitonen",
        password: "salasana1",
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
  })

describe('Get users', () => {
    test('returns two users', async () => {
      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(initialUsers.length)
    })
})

describe('Post users', () => {
    test('adds a user with valid data', async () => {
      const testUser = {
        username: 'marttinen',
        name: 'juha siitonen',
        password: 'keljukojootti'
      }
      const res = await api
          .post('/api/users')
          .send(testUser)
        testUser.id = res.body.id
        expect(res.body.username).toEqual(testUser.username)
    })

    test('adds a user with INVALID data', async () => {
        const testUser = {
          username: 'marttinen',
          name: 'juha siitonen',
          password: 'ke'
        }
        const res = await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test('adds a user with same username as someone else', async () => {
        const testUser = {
          username: 'marttinen',
          name: 'juha siitonen',
          password: 'keljukojootti'
        }
        await api
            .post('/api/users')
            .send(testUser)

        await api
          .post('/api/users')
          .send(testUser)
          .expect(400)
    })       
})