import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Navigationbar = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Navbar.Text>{user.username} is logged in </Navbar.Text>
          <></>
          <button onClick={handleLogout}>logout</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigationbar
