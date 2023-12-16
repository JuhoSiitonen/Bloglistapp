import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddNewBlogs from './AddNewBlogs'

test('pressing create calls form submit with correct values', async () => {
  const mockHandleNewBlog = jest.fn()
  const session = userEvent.setup()
  render(
    <AddNewBlogs handleNewBlog={mockHandleNewBlog} />,
  )

  const input = screen.getByPlaceholderText('title')
  const input2 = screen.getByPlaceholderText('author')
  const input3 = screen.getByPlaceholderText('url')

  const sendButton = screen.getByText('create', { exact: false })

  await session.type(input, 'testing a form...')
  await session.type(input2, 'testing a form...')
  await session.type(input3, 'testing a form...')
  await session.click(sendButton)

  expect(mockHandleNewBlog.mock.calls).toHaveLength(1)
  expect(mockHandleNewBlog.mock.calls[0][0].title).toBe('testing a form...')
})
