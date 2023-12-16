import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    newLike(state, action) {
      const id = action.payload
      const blogToChange = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((n) => (n.id !== id ? n : changedBlog))
    },
    removeBlog(state, action) {
      function removeID(obj, index, arr) {
        if (obj.id === action.payload) {
          arr.splice(index, 1)
          return true
        }
        return false
      }
      state.filter(removeID)
    },
  },
})

export const { newBlog, setBlogs, newLike, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content)
    dispatch(newBlog(blog))
  }
}

export const likeBlog = (content, id) => {
  return async (dispatch) => {
    await blogService.update(content, id)
    dispatch(newLike(id))
  }
}

export const deletionBlog = (id) => {
  return async (dispatch) => {
    await blogService.deletion(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
