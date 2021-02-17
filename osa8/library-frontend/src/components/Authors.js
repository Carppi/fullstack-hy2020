
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_BORN_TO } from '../queries'
import Select from 'react-select';

const Authors = (props) => {

  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [changeBornYear] = useMutation(SET_BORN_TO, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    let bornNumber = Number(born)
    if (!isNaN(bornNumber)) {
      changeBornYear({ variables: { name, born: bornNumber } })
    }

    setName(null)
    setBorn('')
  }

  const handleNameChange = (selectedOption) => {
    console.log(selectedOption)
    setName(selectedOption.value)
  }

  const authorOptions = authors.map(author => ({
    value: author.name,
    label: author.name
  })
  )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={name}
            onChange={handleNameChange}
            options={authorOptions}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
