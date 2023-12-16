const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User
      .find({})
      .populate('blogs', {title: 1, author: 1, url: 1 })
    return response.json(users)
})

userRouter.post('/', async (request, response) => {
   const { username, name, password } = request.body

   if (password === undefined || password.length < 5) {
    return response.status(400).json({ error: 'Password needs to be atleast 3 characters long' })
   }

   const saltRounds = 10 
   const passwordHash = await bcrypt.hash(password, saltRounds)

   const newUser = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  })

  const savedUser = await newUser.save()

  response.status(201).json(savedUser)
})



module.exports = userRouter