import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    addNewComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setComments, addNewComment } = commentSlice.actions

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getAllComments(id)
    dispatch(setComments(comments))
  }
}

export const newComment = (id, content) => {
  return async (dispatch) => {
    console.log('reduseri aktivoituu')
    const comment = await commentService.create(id, content)
    console.log(content)
    dispatch(addNewComment(comment))
  }
}

export default commentSlice.reducer
