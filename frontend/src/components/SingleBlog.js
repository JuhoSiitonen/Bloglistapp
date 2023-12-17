import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeComments, newComment } from '../reducers/commentReducer'
import { ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SingleBlog = ({ blogToSee, addNewLike, deleteBlog }) => {
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  const owner = blogToSee.user.username === user.username ? true : false
  const dispatch = useDispatch()
  console.log(blogToSee.user.username)
  console.log(user.username)

  useEffect(() => {
    dispatch(initializeComments(blogToSee.id))
  }, [dispatch])

  const comments = useSelector(({ comments }) => comments)

  const handleLikes = () => {
    const newLikes = blogToSee.likes + 1
    const blogObject = {
      user: blogToSee.user.id,
      likes: newLikes,
      author: blogToSee.author,
      title: blogToSee.title,
      url: blogToSee.url,
    }
    addNewLike(blogObject, blogToSee.id)
  }

  const handleDeletion = () => {
    if (!window.confirm(`Remove ${blogToSee.title} by ${blogToSee.author}?`)) {
      return
    }
    deleteBlog(blogToSee.id)
    navigate('/')
  }

  const deleteButton = () => {
    return (
      <button onClick={handleDeletion} id="removebutton">
        remove
      </button>
    )
  }

  const newCommentSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.commenttext.value
    event.target.commenttext.value = ''
    const commentToSave = {
      content: comment,
    }
    dispatch(newComment(blogToSee.id, commentToSave))
  }

  if (blogToSee === null) {
    return <></>
  }
  return (
    <div>
      {console.log(blogToSee)}
      <h1>{blogToSee.title}</h1>
      <p>
        <a href={blogToSee.url}>{blogToSee.url}</a>
      </p>
      {blogToSee.likes} likes <button onClick={handleLikes}>like</button>
      <p>added by {blogToSee.user.username}</p>
      {owner && deleteButton()}
      <br></br>
      <h3>Comments</h3>
      <form onSubmit={newCommentSubmit}>
        <input name="commenttext" />
        <button type="submit">add comment</button>
      </form>
      <br></br>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default SingleBlog
