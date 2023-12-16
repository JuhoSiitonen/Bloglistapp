import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import commentReducer from './commentReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    comments: commentReducer,
  },
})

export default store
