import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('user and blog as pre-requisite', () => {
  const user = {
    id: '6011de0ba8bfb2178d29d6f1',
    username: 'root',
    name: 'Superuser'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'Test Url',
    user: user.id
  }

  let component

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        likeBlog= {mockHandler}
      />
    )
  })

  describe('without button pressed', () => {
    test('renders content and not likes nor url', () => {

      const div = component.container.querySelector('.blog')
      expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
      )

      expect(div).not.toHaveTextContent('Test Url')

      expect(div).not.toHaveTextContent('Likes')
    })

    describe('clicking the view button', () => {

      beforeEach(() => {
        const button = component.container.querySelector('.viewButton')
        fireEvent.click(button)
      })

      test('renders likes and url', async () => {

        const div = component.container.querySelector('.blog')
        expect(div).toHaveTextContent(
          'Test Url'
        )
        expect(div).toHaveTextContent(
          'Likes'
        )
      })

      test('and clicking like twice calls event handler twice', async () => {

        const likeButton = component.container.querySelector('.likeButton')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
      })
    })
  })
})