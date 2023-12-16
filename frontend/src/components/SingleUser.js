import { ListGroup } from 'react-bootstrap'

const SingleUser = ({ userToSee }) => {
  console.log(userToSee)
  if (userToSee === null) {
    return <></>
  }
  return (
    <div>
      <h1>{userToSee.username}</h1>
      <br></br>
      <h2>Added blogs:</h2>

      <ListGroup>
        {userToSee.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default SingleUser
