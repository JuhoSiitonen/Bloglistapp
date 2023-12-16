import { useState, useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from './components/ErrorMessage'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import Mainpage from './components/Mainpage'
import Navigationbar from './components/Navigationbar'
import { addNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deletionBlog,
} from './reducers/blogReducer'
import { logInUser, isUserLogged, logout } from './reducers/userReducer'
import userService from './services/users'
import { Container } from 'react-bootstrap'

const App = () => {
  const [users, setUsers] = useState(null)

  const dispatch = useDispatch()
  const origblogs = useSelector(({ blogs }) => blogs)
  const blogs = [...origblogs]
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(isUserLogged())
    userService.getAll().then((response) => setUsers(response))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    dispatch(logInUser(username, password))
    event.target.Username.value = ''
    event.target.Password.value = ''
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleNewBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(
      addNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
      ),
    )
  }

  const addNewLike = (blogObject, id) => {
    dispatch(likeBlog(blogObject, id))
    dispatch(addNotification('like added'))
  }

  const deleteBlog = (id) => {
    dispatch(deletionBlog(id))
    dispatch(addNotification('deletion succesfull'))
  }

  const match = useMatch('/users/:id')
  const userToSee = match ? users.find((n) => n.id === match.params.id) : null

  const match2 = useMatch('/blogs/:id')
  const blogToSee = match2 ? blogs.find((n) => n.id === match2.params.id) : null

  if (user === null) {
    return (
      <Container>
        <div>
          <NotificationMessage />
          <ErrorMessage />
          <h2>Log in to application</h2>
          <LoginForm handleLogin={handleLogin} />
        </div>
      </Container>
    )
  }

  return (
    <div className="container">
      <Navigationbar user={user} handleLogout={handleLogout} />
      <h1>Blog App</h1>
      <NotificationMessage />
      <ErrorMessage />
      <br></br>
      <Routes>
        <Route
          path="/"
          element={<Mainpage handleNewBlog={handleNewBlog} blogs={blogs} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/users/:id"
          element={<SingleUser userToSee={userToSee} />}
        />
        <Route
          path="/blogs/:id"
          element={
            <SingleBlog
              blogToSee={blogToSee}
              addNewLike={addNewLike}
              deleteBlog={deleteBlog}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
