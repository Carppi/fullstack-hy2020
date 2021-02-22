import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, FILTER_BOOKS } from '../queries'
import _ from 'lodash'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState(null)
  const [resultFiltered, { loading, data }] = useLazyQuery(FILTER_BOOKS, {
    fetchPolicy: "cache-and-network"
  })

  useEffect(() => {

    resultFiltered({
      variables: {
        genre: genreFilter
      }
    })

  }, [genreFilter, resultFiltered])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (loading) {
    return <div>loading filtered results...</div>
  }

  const books = data.allBooks
  const allBooks = result.data.allBooks

  const genreList = allBooks.map(book => {
    const genres = book.genres
    return genres
  })
  const flatGenreList = _.flattenDeep(genreList)
  const uniqGenreList = _.uniq(flatGenreList).sort()

  return (
    <div>
      <h2>books</h2>

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
      {uniqGenreList.map(genre =>
        <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
      )}
      <button onClick={() => setGenreFilter(null)}>all genres</button>
    </div>
  )
}

export default Books