import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {

  const result = useQuery(ALL_BOOKS)

  const genreFilter = props.genre

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks

  if (genreFilter) {
    books = books
      .filter(book => book.genres.includes(genreFilter))
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{genreFilter}</b>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join()}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations