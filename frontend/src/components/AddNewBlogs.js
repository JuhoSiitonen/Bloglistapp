import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const AddNewBlogs = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const newBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    handleNewBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const buttonStyle = {
    borderRadius: '2px',
  }

  return (
    <Form onSubmit={newBlog}>
      <Form.Group>
        <div>
          <Form.Label>title:</Form.Label>
          <Form.Control
            value={title}
            name="Title"
            onChange={handleTitleChange}
            id="testTitle"
          />
        </div>
        <div>
          <Form.Label>author:</Form.Label>
          <Form.Control
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            id="testAuthor"
          />
        </div>
        <div>
          <Form.Label>url:</Form.Label>
          <Form.Control
            value={url}
            name="Url"
            onChange={handleUrlChange}
            id="testUrl"
          />
        </div>
        <br></br>
        <div>
          <button type="submit" id="createButton" style={buttonStyle}>
            create
          </button>
        </div>
      </Form.Group>
    </Form>
  )
}

AddNewBlogs.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default AddNewBlogs
