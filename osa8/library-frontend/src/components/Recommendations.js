import React, {useEffect} from 'react'
import { useLazyQuery } from '@apollo/client'
import { FILTER_BOOKS } from '../queries'

const Recommendations = (props) => {


  const genreFilter = props.genre

  const [resultFiltered, { loading, data}] = useLazyQuery(FILTER_BOOKS, {
    fetchPolicy: "cache-and-network"
  })

  useEffect( () => {
    
    resultFiltered({
      variables: {
        genre: genreFilter
      }
    })

  }, [genreFilter, resultFiltered, props.show])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks

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