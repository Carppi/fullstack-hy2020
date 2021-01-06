import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const nameArray = persons.map(person => person.name)

  const addPerson = (event) => {
    event.preventDefault()

    //tarkista onko lisättävä nimi sovelluksen tiedossa
    if (nameArray.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`) //jos nimi löytyy, anna virheilmoitus komennolla alert
    } else {
      //jos ei, lisää tiedostoon
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = (
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {personsToShow.map((person) => {
            return (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
              </tr>)
          })}

        </tbody>
      </table>
      {/* <table>
        <tbody>

          {personsToShow.map((person) => {
            return (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
              </tr>)
          })}

        </tbody>
      </table> */}
      {/* <h2>debugging:</h2>
      <div>debug: newName is {newName}</div> */}
    </div>
  )

}

export default App
