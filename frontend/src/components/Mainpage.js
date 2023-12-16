import Togglable from './Togglable'
import AddNewBlogs from './AddNewBlogs'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Mainpage = ({ handleNewBlog, blogs }) => {
  return (
    <div>
      <h2>Create new</h2>
      <Togglable buttonLabel="create">
        <AddNewBlogs handleNewBlog={handleNewBlog} />
      </Togglable>
      <br></br>
      <Table bordered hover>
        <tbody>
          {blogs
            .sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Mainpage
