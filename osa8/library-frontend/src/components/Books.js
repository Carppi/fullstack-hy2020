import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import _ from 'lodash'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks

  const genreList = books.map(book => {
    const genres = book.genres
    return genres
  })
  const flatGenreList = _.flattenDeep(genreList)
  const uniqGenreList = _.uniq(flatGenreList).sort()
  console.log('uniqGenres',uniqGenreList)

  if (genreFilter) {
    books = books
      .filter(book => book.genres.includes(genreFilter))
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {uniqGenreList.map(genre => 
          <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
      )}
      <button onClick={() => setGenreFilter(null)}>all genres</button>
    </div>
  )
}

export default Books