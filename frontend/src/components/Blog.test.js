import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  _id: '5a43fde2cbd20b12a2c34e91',
  user: {
    _id: '5a43e6b6c37f3d065eaaa581',
    username: 'juuuho',
    name: 'Juho Siitonen',
  },
  likes: 0,
  author: 'Juho SIitonen',
  title: 'Component testing is done with react-testing-library',
  url: 'testi',
}
const mockNewLike = () => {}
const mockDeleteBlog = () => {}
const user = {
  username: 'juuuho',
  id: '1',
}

test('renders content', () => {
  const { container } = render(
    <Blog
      blog={blog}
      addNewLike={mockNewLike}
      deleteBlog={mockDeleteBlog}
      user={user}
    />,
  )
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library',
  )
})

test('clicking view shows likes and username', async () => {
  let container
  container = render(
    <Blog
      blog={blog}
      addNewLike={mockNewLike}
      deleteBlog={mockDeleteBlog}
      user={user}
    />,
  ).container
  const session = userEvent.setup()
  const button = screen.getByText('view')
  await session.click(button)

  const div = container.querySelector('.hiddenAsDefault')
  expect(div).toHaveTextContent('Juho Siitonen')
  expect(div).not.toHaveStyle('display: none')
})

test('Clicking like twice issues two calls to mock function', async () => {
  const mockLikes = jest.fn()
  render(
    <Blog
      blog={blog}
      addNewLike={mockLikes}
      deleteBlog={mockDeleteBlog}
      user={user}
    />,
  )
  const session = userEvent.setup()
  const button = screen.getByText('like')
  await session.click(button)
  await session.click(button)
  expect(mockLikes.mock.calls).toHaveLength(2)
})
