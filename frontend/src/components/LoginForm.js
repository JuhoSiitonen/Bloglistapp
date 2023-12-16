import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin }) => (
  <div>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control type="text" name="Username" />
        <Form.Label>password</Form.Label>
        <Form.Control type="password" name="Password" />
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
export default LoginForm
