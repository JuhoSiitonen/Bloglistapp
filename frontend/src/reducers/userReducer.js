import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { addNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loginNewUser(state, action) {
      return action.payload
    },
    logoutUser() {
      return null
    },
  },
})

export const { loginNewUser, logoutUser } = userSlice.actions

export const logInUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginNewUser(user))
      dispatch(addNotification('Login succesfull!'))
    } catch (error) {
      dispatch(addNotification('Wrong credentials'))
    }
  }
}

export const isUserLogged = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginNewUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedAppUser')
    dispatch(logoutUser())
    dispatch(addNotification('Logoff succesfull'))
  }
}

export default userSlice.reducer
