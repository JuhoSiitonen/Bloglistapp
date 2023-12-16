import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td>{blog.author}</td>
    </div>
  )
}

export default Blog
