import React, { useState } from 'react'

const Filter = ({ filterValue, filterFunction }) => (
  <div>
    filter shown with <input value={filterValue} onChange={filterFunction} />
  </div>
)

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
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
  )
}

const Persons = ({ persons, filter }) => {

  const personsToShow = (
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <table>
      <tbody>
        {personsToShow.map((person) => (
          <Person person={person} key={person.name} />
        )
        )}
      </tbody>
    </table>
  )
}

const Person = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
)

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


  const addPerson = (event) => {
    event.preventDefault()

    const nameArray = persons.map(person => person.name.toLowerCase)

    //tarkista onko lisättävä nimi sovelluksen tiedossa
    if (nameArray.includes(newName.toLowerCase)) {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} filterFunction={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App
