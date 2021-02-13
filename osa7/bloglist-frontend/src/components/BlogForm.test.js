import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom' //pienempien osien tulostamiseen
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let component

  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm
        createBlog={createBlog}
      />
    )
  })

  test('updates parent state and calls onSubmit with correct parameters', () => {
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('.blogForm')

    fireEvent.change(author, {
      target: { value: 'BlogTest Author' }
    })
    fireEvent.change(title, {
      target: { value: 'BlogTest Title' }
    })
    fireEvent.change(url, {
      target: { value: 'BlogTest Url' }
    })
    fireEvent.submit(form)

    const mockParameters = createBlog.mock.calls[0][0]

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(mockParameters.author).toBe('BlogTest Author')
    expect(mockParameters.title).toBe('BlogTest Title')
    expect(mockParameters.url).toBe('BlogTest Url')
  })

})