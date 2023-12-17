const app = require('./app') 
const config = require('./utils/config')
const express = require('express')

const PORT = process.env.PORT || 3003

app.use(express.static('build'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})